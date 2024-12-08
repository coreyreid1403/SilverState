import WinePurchaseInfo from "./WinePurchaseInfo";

/**
 * The checkout cart
 */
export default class Cart {
  //#region properties
  name: string;

  email: string;
  /**
   * number of items, productId
   */
  items: WinePurchaseInfo[];


  purchaseId: string;

  //#endregion

  /**
   *  Donation Cart
   * @param name
   * @param email
   * @param items
   * @param purchaseId
   */
  constructor(
    name: string,
    email: string,
    items: WinePurchaseInfo[],
    purchaseId: string
  ) {
    this.name = name;
    this.email = email;
    this.items = items;
    this.purchaseId = purchaseId;
  }
}
