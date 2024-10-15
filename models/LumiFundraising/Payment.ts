/**
 * Payment
 */
export default class Payment {
  //#region properties
  name: string;
  amount: number;
  date: Date;
  id: string;
  //#endregion

  /**
   *  Payment
   */
  constructor(
    name: string,
    amount: string,
    date: string,
    id: string
  ) {
    this.name = name;
    this.amount = Number(amount);
    this.date = new Date(date);
    this.id = id;
  }
}
