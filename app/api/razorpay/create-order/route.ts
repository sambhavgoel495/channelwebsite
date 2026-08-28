import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
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

    const { bundleId } = await req.json();
    if (!bundleId) {
      return NextResponse.json({ success: false, error: 'bundleId is required.' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Check if user already owns this bundle
    const { data: existingCompleted } = await supabaseAdmin
      .from('purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('bundle_id', String(bundleId))
      .eq('status', 'Completed')
      .maybeSingle();

    if (existingCompleted) {
      return NextResponse.json(
        { success: false, error: 'You already own this bundle! Check My Library.' },
        { status: 400 }
      );
    }

    // Fetch bundle price server-side from database (Never trust client-submitted prices!)
    const { data: bundle, error: bundleError } = await supabaseAdmin
      .from('bundles')
      .select('*')
      .eq('id', String(bundleId))
      .maybeSingle();

    if (bundleError || !bundle) {
      return NextResponse.json({ success: false, error: 'Bundle not found.' }, { status: 404 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ success: false, error: 'Razorpay server configuration is missing.' }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const amountInPaise = Math.round(Number(bundle.price) * 100);

    const orderOptions = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${user.id.slice(0, 8)}_${Date.now()}`,
      notes: {
        userId: user.id,
        bundleId: String(bundle.id),
        bundleTitle: bundle.title,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    // Insert Pending purchase record using service role key
    const { error: insertError } = await supabaseAdmin.from('purchases').insert({
      user_id: user.id,
      bundle_id: String(bundle.id),
      amount: bundle.price,
      payment_method: 'Razorpay',
      status: 'Pending',
      razorpay_order_id: order.id,
      date: new Date().toISOString(),
    });

    if (insertError) {
      console.error('Error inserting pending purchase record:', insertError);
      return NextResponse.json(
        { success: false, error: `Failed to record pending order: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keyId,
      bundleTitle: bundle.title,
    });
  } catch (err: any) {
    console.error('Error in create-order API:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
