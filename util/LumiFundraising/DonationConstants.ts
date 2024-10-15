import { Constants } from "../LumiMeals/Constants";

export default class DonationConstants {
  static readonly FundraiserType = [
    "Normal",
    "Student Raffle",
    "Raffle"
  ];

  static readonly TeamsMap = new Map<string, string>([
    ["Damonte Track", process.env.NEXT_PUBLIC_DAMONTE_TRACK ?? ''],
    ["Damonte Cross", process.env.NEXT_PUBLIC_DAMONTE_CROSS ?? ''],
  ]);

  static readonly myCharge: number = 0.03;
  static readonly stripePercentage: number = 0.03;
  static readonly stripeFlatFee: number = 0.3;

  /**
   * The string name of the coach email cookie
   */
  static readonly fundCoachCookie = "currentFundCoach";

  /**
 * The string name of the athlete athleteId,fundId cookie
 */
  static readonly fundAthleteCookie = "currentFundAthlete";

  /**
   * the base url for fundraising app
   */
  static readonly fundraisingBaseURL = Constants.baseURL + "/LumiFundraising";

  /**
   * the base url for fundraising app
   */
  static readonly baseURL = Constants.baseURL;

  /**
   * ID for overhead coverage
   */
  static readonly OverheadMap = new Map<string, string>([
    ["Damonte Track", process.env.NEXT_PUBLIC_DAMONTE_TRACK_OVERHEAD ?? ''],
    ["Damonte Cross", process.env.NEXT_PUBLIC_DAMONTE_TRACK_OVERHEAD ?? ''],
  ]);

  /**
   * Default form colors
   */
  static readonly defaultPrimary = "#3c3a3c";

  static readonly defaultSecondary = "#1be6ff";

  //#region API Endpoints*******************************************************************************
  //# region Fundraiser*****************************
  /**
   * Endpoint get update user
   */
  static readonly endpointCheckout =
    "/api/LumiFundraising/payment/checkout_sessions";

  /**
   * Endpoint to add Fundraiser
   */
  static readonly endpointCreateFundraiser =
    "/api/LumiFundraising/fundraiser/addFundraiser";

  /**
   * Endpoint to get Fundraiser
   */
  static readonly endpointGetFundraiser =
    "/api/LumiFundraising/fundraiser/getFundraiser";

  /**
   * Endpoint to get all Fundraisers
   */
  static readonly endpointGetAllFundraisersFromIds =
    "/api/LumiFundraising/fundraiser/getAllFundraisersFromIds";

  /**
    * Endpoint to get all Fundraisers
    */
  static readonly endpointGetAllFundraisers =
    "/api/LumiFundraising/fundraiser/getAllFundraisers";

  /**
   * Endpoint to update fundraiser
   */
  static readonly endpointUpdateFundraiser =
    "/api/LumiFundraising/fundraiser/updateFundraiser";
  //#endregion

  //#region Coach*****************************
  /**
   * Endpoint to process Image
   */
  static readonly endpointProcessImage =
    "/api/LumiFundraising/fundraiser/processImage";

  /**
   * Endpoint to add Coach
   */
  static readonly endpointSignInCoach =
    "/api/LumiFundraising/coach/signInCoach";

  /**
   * Endpoint to add Coach
   */
  static readonly endpointSignUpCoach =
    "/api/LumiFundraising/coach/signUpCoach";

  /**
   * Endpoint to get Coach
   */
  static readonly endpointGetCoach = "/api/LumiFundraising/coach/getCoach";

  /**
   * Endpoint to update Coach
   */
  static readonly endpointUpdateCoach =
    "/api/LumiFundraising/coach/updateCoach";
  //#endregion

  //#region Athlete*****************************
  /**
   * Endpoint to signIn Athlete
   */
  static readonly endpointSignInAthlete =
    "/api/LumiFundraising/athlete/signInAthlete";

  /**
   * Endpoint to add Athlete
   */
  static readonly endpointCreateAthlete =
    "/api/LumiFundraising/athlete/addAthlete";

  /**
   * Endpoint to get Athlete
   */
  static readonly endpointGetAthlete =
    "/api/LumiFundraising/athlete/getAthlete";

  /**
   * Endpoint to get all Athletes for fundraiser
   */
  static readonly endpointGetAthletes =
    "/api/LumiFundraising/athlete/getAthletes";

  /**
   * Endpoint to update Athlete
   */
  static readonly endpointUpdateAthlete =
    "/api/LumiFundraising/athlete/updateAthlete";

  /**
* Endpoint to update Athlete
*/
  static readonly endpointDeleteAthlete =
    "/api/LumiFundraising/athlete/deleteAthlete";
  //#endregion

  static readonly postgresURI =
    "/api/LumiFundraising/postgres";

  static readonly endpointCreateDonator =
    "/donator/addDonator";

  static readonly endpointGetDonator =
    "/donator/getDonator";

  static readonly endpointCreateDonation =
    "/donation/addDonation";
  
  static readonly endpointTry =
    '/donation/try';

  static readonly endpointRemoveDonation =
    "/donation/removeDonation";

  static readonly endpointGetDonation =
    "/donation/getDonation";

  static readonly endpointGetPackedDonation =
    "/donation/getPackedDonation";

  static readonly endpointGetDonationsByIds =
    "/donation/getDonationByIds";

  static readonly endpointGetPackedDonationsByIds =
    "/donation/getPackedDonationByIds";

  static readonly endpointGetDonationsByAthlete =
    "/donation/getDonationByAthlete";

  static readonly endpointGetDonationsByFundraiser =
    "/donation/getDonationByFundraiser";

  static readonly endpointGetPackedDonationsByFundraiser =
    "/donation/getPackedDonationByFundraiser";

  static readonly endpointGetPackedDonationsByAthlete =
    "/donation/getPackedDonationByAthlete";

  static readonly endpointGetFailedPackedDonationsByAthlete =
    "/donation/getFailedPackedDonationByAthlete";

  static readonly endpointValidateDonation =
    "/donation/validateDonation";

  static readonly endpointGetFailedDonationsForAthlete =
    "/donation/getFailedDonationsForAthlete";
  //#endregion
}
