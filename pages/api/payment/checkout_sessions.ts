import Cart from "../../../models/Cart";
import Constants from "../../../util/Constants";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);
      const cart: Cart = body?.cart;
      const line_items = makeCart(cart);
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${Constants.baseURL}/payment/success?donationId=${cart.donationId}&fundraiserId=${cart.fundraiserId}`,
        cancel_url: `${Constants.baseURL}/payment/cancel`,
      });
      res.status(200).json({ session: session, error: "" });
    } catch (err: any) {
      console.error("Error");
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

/**
 * Create the Cart
 */
function makeCart(cart: Cart) {
  let line_items = [
    // {
       // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //   price: "90",
    //   quantity: 1,
    // },
    {
      price_data: {
        currency: "USD",
        product: cart.teamId,
        unit_amount: cart.donation * 100,
      },
      quantity: 1,
    },
  ];

  return line_items;
}
