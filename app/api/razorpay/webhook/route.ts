import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { getSupabaseAdmin, ensureUserExistsInPublic } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-razorpay-signature');
    if (!signature) {
      return NextResponse.json({ success: false, error: 'Missing Razorpay signature header.' }, { status: 400 });
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is missing in environment variables.');
      return NextResponse.json({ success: false, error: 'Razorpay webhook secret is missing.' }, { status: 500 });
    }

    // 1. Read raw text body for HMAC SHA256 verification (Must be before JSON parsing!)
    const rawBody = await req.text();

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (
      expectedBuffer.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
    ) {
      console.error('Invalid Razorpay Webhook signature');
      return NextResponse.json({ success: false, error: 'Invalid webhook signature.' }, { status: 400 });
    }

    // 2. Parse JSON payload AFTER cryptographic signature verification
    const event = JSON.parse(rawBody);
    const eventId = String(event.event_id || event.id || `evt_${Date.now()}`);
    const eventType = String(event.event || '');

    const supabaseAdmin = getSupabaseAdmin();

    // 3. Handle Order & Payment Success Events (order.paid, payment.captured)
    if (eventType === 'order.paid' || eventType === 'payment.captured') {
      const paymentEntity = event.payload?.payment?.entity;
      const orderEntity = event.payload?.order?.entity;

      const orderId = orderEntity?.id ? String(orderEntity.id) : (paymentEntity?.order_id ? String(paymentEntity.order_id) : null);
      const paymentId = paymentEntity?.id ? String(paymentEntity.id) : null;

      if (!orderId) {
        return NextResponse.json({ success: true, message: 'No order_id associated with event.' });
      }

      // Check if purchase record already exists
      const { data: existingPurchase } = await supabaseAdmin
        .from('purchases')
        .select('*')
        .eq('razorpay_order_id', orderId)
        .maybeSingle();

      if (existingPurchase) {
        // Idempotency check: if already Completed, do nothing and return 200 OK
        if (existingPurchase.status === 'Completed') {
          return NextResponse.json({ success: true, message: 'Purchase already marked as Completed.' });
        }

        // Update purchase to Completed
        const { error: updateErr } = await supabaseAdmin
          .from('purchases')
          .update({
            status: 'Completed',
            payment_id: paymentId || existingPurchase.payment_id,
            razorpay_event_id: eventId,
          })
          .eq('id', existingPurchase.id);

        if (updateErr) {
          console.error('Error updating purchase in webhook:', updateErr);
          return NextResponse.json({ success: false, error: updateErr.message }, { status: 500 });
        }
      } else {
        // Server-to-Server Fallback: Fetch order details securely from Razorpay API
        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (keyId && keySecret) {
          const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
          const razorpayOrder = await razorpay.orders.fetch(orderId);

          const rawUserId = razorpayOrder.notes?.userId;
          const rawBundleId = razorpayOrder.notes?.bundleId;

          if (rawUserId && rawBundleId) {
            const userId = String(rawUserId);
            const bundleId = String(rawBundleId);

            // Verify user exists in public.users
            await ensureUserExistsInPublic({ id: userId });

            const { data: bundle } = await supabaseAdmin
              .from('bundles')
              .select('price')
              .eq('id', bundleId)
              .maybeSingle();

            const finalAmount = bundle?.price || Math.round(Number(razorpayOrder.amount) / 100);

            const { error: insertErr } = await supabaseAdmin.from('purchases').insert({
              user_id: userId,
              bundle_id: bundleId,
              amount: finalAmount,
              payment_method: 'Razorpay',
              status: 'Completed',
              payment_id: paymentId,
              razorpay_order_id: orderId,
              razorpay_event_id: eventId,
              date: new Date().toISOString(),
            });

            if (insertErr) {
              console.error('Error inserting fallback purchase in webhook:', insertErr);
              return NextResponse.json({ success: false, error: insertErr.message }, { status: 500 });
            }
          }
        }
      }
    } else if (eventType === 'payment.failed') {
      const paymentEntity = event.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id ? String(paymentEntity.order_id) : null;

      if (orderId) {
        const { data: existingPurchase } = await supabaseAdmin
          .from('purchases')
          .select('*')
          .eq('razorpay_order_id', orderId)
          .maybeSingle();

        // Idempotency: Only update if purchase is currently Pending (Never downgrade a Completed purchase!)
        if (existingPurchase && existingPurchase.status === 'Pending') {
          await supabaseAdmin
            .from('purchases')
            .update({
              status: 'Failed',
              razorpay_event_id: eventId,
            })
            .eq('id', existingPurchase.id);
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook event processed successfully.' });
  } catch (err: any) {
    console.error('Error in Razorpay Webhook route:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
