import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  let data = await request.json();
  let priceId = data.priceId;
  const rootUrl = process.env.NODE_ENV === "production" ? process.env.PROD_URL : process.env.DEV_URL;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${rootUrl}/inspection-request?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: rootUrl,
    payment_intent_data: {
      metadata: {
        payingFor: "inspection",
        userId: data.userId,
        inspectionRequestId: data.inspectionRequestId,
      },
    },
  });

  return NextResponse.json(session.url);
}
