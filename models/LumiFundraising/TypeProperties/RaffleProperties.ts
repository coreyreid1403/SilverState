import Donation from "../Donation";
import PackedDonation from "../PackedDonation";
import { FundraiserTypes } from "../enums";
import { BaseFundraiserType } from "./BaseFundraiserTypeProperties";

export default class RaffleProperties extends BaseFundraiserType{

  pricePerTicket: number;
  prizes: number[];
  winners: PackedDonation[];
  coverExtraTicket: boolean;
  
  constructor(pricePerTicket: number = 0,
    prizes: number[] = [],
    coverExtraTicket: boolean = false,
    winners: PackedDonation[] = []) {
    super(FundraiserTypes.Raffle);
    this.pricePerTicket = pricePerTicket;
    this.prizes = prizes;
    this.coverExtraTicket = coverExtraTicket;
    this.winners = winners;
  }
}
