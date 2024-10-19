export default class Constants {
  static readonly WineType = [
    "Red",
    "White"
  ];

  static readonly ProductMap = new Map<string, string>([
    ["Damonte Track", process.env.NEXT_PUBLIC_DAMONTE_TRACK ?? ''],
    ["Damonte Cross", process.env.NEXT_PUBLIC_DAMONTE_CROSS ?? ''],
  ]);

    /**
   * Custom alphabet for nanoId
   */
    static readonly nanoIdAlphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

  /**
   * The string name of the coach email cookie
   */
  static readonly fundCoachCookie = "currentFundCoach";


    /**
   * the base url
   */
    static readonly baseURL = process.env.NEXT_PUBLIC_HOST;

  
    /**
     * Publishable key for stripe payments
     */
    static readonly stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
    /**
     * If in test mode
     */
      static readonly testMode = process.env.NEXT_PUBLIC_VERCEL_ENV === 'development';

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
    "/api/payment/checkout_sessions";

  //#region Coach*****************************
  /**
   * Endpoint to add user
   */
  static readonly endpointSignInUser =
    "/api/user/signIn";

  /**
   * Endpoint to add user
   */
  static readonly endpointSignUpUser =
    "/api/user/signUp";

  /**
   * Endpoint to get user
   */
  static readonly endpointGetUser = "/api/user/get";

  /**
   * Endpoint to update user
   */
  static readonly endpointUpdateUser =
    "/api/user/update";
  //#endregion

  static readonly postgresURI =
    "/api/postgres";

  //#endregion
}
