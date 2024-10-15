import { nanoid } from 'nanoid'
import Donator from './Users/Donator';
import Athlete from './Users/Athlete';
import Donation from './Donation';

/**
 * Object for an individual donation
 */
export default class PackedDonation extends Donation{
  //#region properties
  donator: Donator;
  // athlete: Athlete;
  //#endregion

  /**
   *  Donation 
   */
  constructor(
    donator: Donator,
    amount: number,
    athleteId: string,
    athleteName: string,
    fundraiserId: string,
    cash: boolean,
    bonusTicket: boolean = false,
    completed: boolean = false
  ) {
    super(donator.donatorId, amount, athleteId, athleteName, fundraiserId, cash, bonusTicket, completed);
    this.donator = donator;
    // this.athlete = athlete;
  }
}
