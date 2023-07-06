
import Order from "../../Schemas/Order";
import {buffer} from 'micro';
import { dbConnect } from "./products";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// localhost:3000/api/webhook
export default async function handler(req, res) {
  await dbConnect();
  const signingSecret = 'whsec_3197bf8bd396468625827b311463b2c36c0c65026a6f2cd3d8c308abe81737bc';
  const payload = await buffer(req);
  const signature = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(payload, signature, signingSecret);

  if (event?.type === 'checkout.session.completed') {
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId && paymentStatus === 'paid') {
      await Order.findByIdAndUpdate(metadata.orderId, {paid:1});
    }
  }

  res.json('ok');

}

export const config = {
  api: {
    bodyParser: false,
  }
};