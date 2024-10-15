import { Constants } from "../../../../util/LumiMeals/Constants";
import Cart from "../../../../models/LumiFundraising/Cart";
import DonationConstants from "../../../../util/LumiFundraising/DonationConstants";


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
        success_url: `${Constants.fundraisingBaseURL}/payment/success?donationId=${cart.donationId}&fundraiserId=${cart.fundraiserId}`,
        cancel_url: `${Constants.fundraisingBaseURL}/payment/cancel`,
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

  if (cart.coverOverhead) {
    line_items.push({
      price_data: {
        currency: "USD",
        product: getOverheadId(cart.team),
        unit_amount: cart.overhead * 100,
      },
      quantity: 1,
    });
  }

  return line_items;
}

  /**
   * Get Available overheads
   * @returns
   */
  function getOverheads(): Map<string, string> {
    return DonationConstants.OverheadMap;
  }

  /**
   * Gets overhead id from team name
   * @returns
   */
  function getOverheadId(teamName: string): string {
    const overheads = getOverheads();
    const overheadId = overheads.get(teamName);
    if (overheadId && overheadId.length > 0) {
      return overheadId;
    }
    console.error('Error, Could not find overhead for team: ' + teamName);
    return '';
  }
