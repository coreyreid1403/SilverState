import { nanoid } from 'nanoid'

/**
 * Object for an individual donation
 */
export default class Donation{
  //#region properties
  donationId: string;
  donatorId: string;
  athleteId: string;
  athleteName: string;
  fundraiserId: string;
  amount: number;
  cash: boolean;
  bonusTicket: boolean;
  received: Date;
  completed: boolean;
  //#endregion

  /**
   *  Donation 
   */
  constructor(
    donatorId: string,
    amount: number,
    athleteId: string,
    athleteName: string,
    fundraiserId: string,
    cash: boolean,
    bonusTicket: boolean = false,
    completed: boolean = false
  ) {
    this.donationId = nanoid();
    this.donatorId = donatorId;
    this.fundraiserId = fundraiserId;
    this.amount = amount;
    this.athleteId = athleteId;
    this.athleteName = athleteName;
    this.cash = cash;
    this.bonusTicket = bonusTicket;
    this.received = new Date();
    this.completed = completed;
  }
}
