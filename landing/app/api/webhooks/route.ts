import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "@/lib/firebaseConfig/init";
import { InspectionRequestsCollection } from "@/lib/network/inspection-requests";
import { Step } from "@/components/forms/StepWidget";
import { sendSlackMessage } from "@/lib/slack";
import { WebClient } from "@slack/web-api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;


const webhookHandler = async (req: NextRequest) => {
    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature")!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Unknown error";
            // On error, log and return the error message.
            if (err! instanceof Error) console.log(err);
            console.log(`❌ Error message: ${errorMessage}`);

            return NextResponse.json(
                {
                    error: {
                        message: `Webhook Error: ${errorMessage}`,
                    },
                },
                { status: 400 }
            );
        }

        // Successfully constructed event.
        console.log("✅ Success:", event.id);
        console.log("✅ EVENT TYPE:", event.type);




        // getting to the data we want from the event
        const payment = event.data.object as Stripe.PaymentIntent;
        const paymentId = payment.id;

        switch (event.type) {
            case "payment_intent.succeeded":
                console.log("💰 Payment received!");
                const { userId } = payment.metadata;
                const { inspectionRequestId } = payment.metadata;
                const docRef = doc(
                    db,
                    InspectionRequestsCollection,
                    inspectionRequestId
                );
                await updateDoc(docRef, {
                    paymentId,
                    step: Step.Schedule,
                });

                const options = {};
                const slack = new WebClient(process.env.SLACK_OAUTH!, options);

                try {
                    await slack.conversations.join({
                        channel: process.env.SLACK_CHANNEL_ID!,
                    });

                    await slack.chat.postMessage({
                        channel: "C065LPPS5UH",
                        text: "New Inspection request received from ",
                    })

                    await sendSlackMessage("New Inspection request received", null);

                } catch (error) {
                    console.log("SLACK ERROR", error);
                }


                break;
            case "customer.subscription.deleted":
                console.log("👋 Subscription cancelled!");
                break;

            default:
                console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
                break;
        }

        // Return a response to acknowledge receipt of the event.
        return NextResponse.json({ received: true });
    } catch {
        return NextResponse.json(
            {
                error: {
                    message: `Method Not Allowed`,
                },
            },
            { status: 405 }
        ).headers.set("Allow", "POST");
    }
};

export { webhookHandler as POST };
