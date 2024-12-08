import { Wine } from "./Wine";
import { WineYear } from "./WineYear";

export default class WinePurchaseInfo {
  wine: Wine;

  year: WineYear;
  
  amount: number;


  constructor(
    wine: Wine,
    year: WineYear,
    amount: number
  ) {
    this.wine = wine;
    this.year = year;
    this.amount = amount;
  }
}
