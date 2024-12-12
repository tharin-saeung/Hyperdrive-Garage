import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getSession } from '@/lib/session'; // Assuming this is your session management utility

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Please log in before making a purchase.' },
        { status: 401 }
      );
    }

    // Proceed with payment creation
    const { price, name } = await req.json();
    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'thb',
            unit_amount: price,
            product_data: {
              name: name,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    return NextResponse.json({ url: stripeSession.url }, { status: 303 });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}