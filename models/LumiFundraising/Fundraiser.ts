import { Constants } from '../../util/LumiMeals/Constants';
import TaxInfo from './TaxInfo';
import { customAlphabet } from 'nanoid';
import { BaseFundraiserType } from './TypeProperties/BaseFundraiserTypeProperties';

/**
 * Coach
 */
export default class Fundraiser {
  //#region properties
  name: string;
  id: string;
  team: string;
  teamId: string;

  /**
   * head coach email
   */
  coachEmail: string;
  /**
   * Chosen Primary Color for donations forms
   */
  primaryColor: string;
  /**
   * Chosen secondary Color for donations forms
   */
  secondaryColor: string;
  /**
   * If font color needs to be swapped
   */
  invertFontColor: boolean;
  startDate: Date;
  endDate: Date | undefined;
  fullyPaidOutDate: Date | undefined;
  /**
   * The type of donation if it has special prizes
   */
  type: number;
  typeProperties: BaseFundraiserType[] = [];
  athleteGoal: number;
  overallGoal: number;
  payoutAddress: string;
  /**
   * who to address the check to
   */
  payoutName: string;
  /**
   * fees to take from donation
   */
  feeAmount: number = 0;
  /**
   * any needed tax information
   */
  taxFormInfo: TaxInfo | undefined;
  /**
   * Suggested request message for athletes to send
   */
  requestMessage: string;
  /**
   * Note for potential donators to show up on donation form
   */
  noteFromCoach: string;
  /**
   * The actual amount the team received minus fees
   */
  actualFundsReceived: number = 0;
  /**
   * The amount paid out to team from fundraiser
   */
  amountPaidOut: number = 0;
  /**
   * The amount paid out to team from fundraiser
   */
  availableFunds: number = 0;
  //#endregion

  constructor(
    name: string,
    team: string,
    teamId: string,
    coach: string,
    primaryColor: string,
    secondaryColor: string,
    invertFontColor: boolean,
    startDate: Date,
    type: number,
    athleteGoal: number,
    overallGoal: number,
    payoutAddress: string,
    payoutName: string,
    requestMessage: string,
    noteFromCoach: string
  ) {
    this.name = name;
    const nanoid = customAlphabet(Constants.nanoIdAlphabet, 6);
    this.id = nanoid();
    this.team = team;
    this.teamId = teamId;
    this.coachEmail = coach;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.invertFontColor = invertFontColor;
    this.startDate = startDate;
    this.type = type;
    this.athleteGoal = athleteGoal;
    this.overallGoal = overallGoal;
    this.payoutAddress = payoutAddress;
    this.payoutName = payoutName;
    this.requestMessage = requestMessage;
    this.noteFromCoach = noteFromCoach;
  }
}
