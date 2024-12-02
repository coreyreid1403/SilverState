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
  items: Map<number, string>;


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
    items: Map<number, string>,
    purchaseId: string
  ) {
    this.name = name;
    this.email = email;
    this.items = items;
    this.purchaseId = purchaseId;
  }
}
