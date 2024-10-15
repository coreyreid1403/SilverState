/**
 * The checkout cart for donation
 */
export default class Cart {
  //#region properties
  /**
   * Name of donor
   */
  name: string;

  /**
   * email
   */
  email: string;

  /**
   * Sport team donating to
   */
  team: string;

  /**
   * Sport team donating to ID
   */
  teamId: string;

  /**
   * IF they want to cover our fees
   */
  coverOverhead: boolean;

  /**
   * Our fees
   */
  overhead: number;

  /**
   * Amount to donate
   */
  donation: number;

  /**
   * DonationId
   */
  donationId: string;

  /**
   * FundraiserId
   */
    fundraiserId: string;
  //#endregion

  /**
   *  Donation Cart
   * @param name
   * @param email
   * @param team
   * @param coverOverhead
   * @param overhead
   * @param donation
   * @param donationId
   * @param fundraiserId
   */
  constructor(
    name: string,
    email: string,
    team: string,
    teamId: string,
    coverOverhead: boolean,
    overhead: number,
    donation: number,
    donationId: string,
    fundraiserId: string
  ) {
    this.name = name;
    this.email = email;
    this.team = team;
    this.teamId = teamId;
    this.coverOverhead = coverOverhead;
    this.overhead = overhead;
    this.donation = donation;
    this.donationId = donationId;
    this.fundraiserId = fundraiserId;
  }
}
