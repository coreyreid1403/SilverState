/**
 * Payment
 */
export default class Customer {
  //#region properties
  name: string;
  amount: number;
  //#endregion

  /**
   *  Payment
   */
  constructor(
    name: string,
    amount: string,
  ) {
    this.name = name;
    this.amount = Number(amount);
  }
}
