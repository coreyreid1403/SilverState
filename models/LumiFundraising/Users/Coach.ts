import { BaseUser } from "../../BaseUser";

/**
 * Coach
 */
export default class Coach extends BaseUser {
  //#region properties
  teams: string[] = [];

  fundraisersIds: string[] = [];

  displayName: string
  //#endregion

  /**
   *  Coach
   * @param name
   * @param email
   * @param password
   * @param fundraisersIds
   */
  constructor(
    name: string,
    email: string,
    password: string
  ) {
    super(name, password, email);
    this.displayName = name;
  }
}
