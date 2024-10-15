import { BaseUser } from "../../BaseUser";

/**
 * Athlete
 */
export default class Athlete extends BaseUser {
  //#region properties
  name: string;
  fundraiserId: string;
  fundraiserAthleteGoal: number;
  //is undefined until set
  donationValue: number | undefined;
  //#endregion

  /**
   *  Athlete
   */
  constructor(
    name: string,
    fundraiserId: string,
    fundraiserAthleteGoal: number
  ) {
    super(name, '', '', 6);
    this.name = name;
    this.fundraiserId = fundraiserId; //TODO: split this into completed and pending
    this.fundraiserAthleteGoal = fundraiserAthleteGoal;
  }
}
