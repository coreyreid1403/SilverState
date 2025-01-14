import { useRouter } from "next/navigation";
import Constants from "../util/Constants";
import Cart from "../models/Cart";
import WinePurchaseInfo from "../models/WinePurchaseInfo";

export default class PaymentService {
  router = useRouter();

  /**
   * Sends user to Cart to pay.
   * @returns 
   */
  public async sendCart(cart: Cart): Promise<[string]> {
    const res = await fetch(
      Constants.baseURL + Constants.endpointCheckout,
      {
        method: "POST",
        body: JSON.stringify({ cart }),
      }
    );
    const posts = await res.json();
    if (res.status === 200 && posts.error.length === 0) {
      this.router.push(posts.session.url);
    }
    else{
      console.error("Error with cart: ");
      console.log(posts);
    }
    return [posts.error];
  }

  public calculateTotal(wines: WinePurchaseInfo[]) {
    let total = 0;
    wines.forEach((wine) => {
      total = total + (wine.amount * wine.year.cost)
    });
    return total;
  }
}
