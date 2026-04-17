import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as any,
});

export async function POST(request: Request) {
  try {
    const { items } = await request.json();
    const origin = request.headers.get('origin');

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.title} (${item.color}, ${item.storage})`,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Session Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
