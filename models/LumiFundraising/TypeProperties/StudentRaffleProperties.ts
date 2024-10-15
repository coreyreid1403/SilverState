import { FundraiserTypes } from "../enums";
import { BaseFundraiserType as BaseFundraiserTypeProperties } from "./BaseFundraiserTypeProperties";

export default class StudentRaffleProperties extends BaseFundraiserTypeProperties{

  pricePerTicket: number;
  prizes: number[];
  winners: string[];
  
  constructor(pricePerTicket: number = 0,
    prizes: number[] = [],
    winners: string[] = []) {
    super(FundraiserTypes.StudentRaffle);
    this.pricePerTicket = pricePerTicket;
    this.prizes = prizes;
    this.winners = winners;
  }
}
