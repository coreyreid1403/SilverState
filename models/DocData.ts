/**
 * DocData
 */
export default class DocData{
  //#region properties
  date: string;
  donator: string;
  amount: string;
  //#endregion

  /**
   *  DocData
   */
  constructor(
    date: string,
    donator: string,
    amount: string
  ) {
    this.date = date;
    this.donator = donator;
    this.amount = amount;
  }
}
