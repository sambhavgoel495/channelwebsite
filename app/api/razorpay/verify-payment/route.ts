import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase, getSupabaseAdmin, ensureUserExistsInPublic } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Auth token missing.' }, { status: 401 });
    }

    // Authenticate user token via Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized user session.' }, { status: 401 });
    }

    // Ensure public.users record exists for foreign key constraint purchases_user_id_fkey
    await ensureUserExistsInPublic(user);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bundleId } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Missing required payment verification parameters.' }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ success: false, error: 'Razorpay secret key configuration is missing.' }, { status: 500 });
    }

    // 1. Verify HMAC SHA256 Signature using timingSafeEqual
    const bodyData = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(bodyData)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const signatureBuffer = Buffer.from(razorpay_signature, 'utf8');

    if (
      expectedBuffer.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
    ) {
      console.error('Razorpay signature mismatch!');
      return NextResponse.json(
        { success: false, error: 'Payment signature verification failed. Invalid transaction signature.' },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 2. Fetch pending purchase to ensure order belongs to this authenticated user
    const { data: existingPurchase, error: fetchErr } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .eq('razorpay_order_id', razorpay_order_id)
      .maybeSingle();

    if (existingPurchase && existingPurchase.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden. Order belongs to a different user account.' },
        { status: 403 }
      );
    }

    // 3. Mark purchase as Completed in database via Service Role Admin Client
    if (existingPurchase) {
      const { error: updateError } = await supabaseAdmin
        .from('purchases')
        .update({
          status: 'Completed',
          payment_id: razorpay_payment_id,
          razorpay_signature: razorpay_signature,
        })
        .eq('id', existingPurchase.id);

      if (updateError) {
        console.error('Error updating purchase status:', updateError);
        return NextResponse.json({ success: false, error: `Database update failed: ${updateError.message}` }, { status: 500 });
      }
    } else {
      // Fetch server-side bundle price for fallback record
      const { data: bData } = await supabaseAdmin
        .from('bundles')
        .select('price')
        .eq('id', String(bundleId))
        .maybeSingle();

      const finalAmount = bData?.price ?? 49;

      const { error: insertError } = await supabaseAdmin.from('purchases').insert({
        user_id: user.id,
        bundle_id: String(bundleId),
        amount: finalAmount,
        payment_method: 'Razorpay',
        status: 'Completed',
        payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
        date: new Date().toISOString(),
      });

      if (insertError) {
        console.error('Error inserting verified purchase record:', insertError);
        return NextResponse.json({ success: false, error: `Database insert failed: ${insertError.message}` }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and bundle unlocked successfully.',
    });
  } catch (err: any) {
    console.error('Error in verify-payment API:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
