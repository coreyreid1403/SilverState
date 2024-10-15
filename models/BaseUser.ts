import { Constants } from "../util/LumiMeals/Constants";

import { customAlphabet } from 'nanoid'

/**
 * Definition of a user
 */
export class BaseUser {
  //#region properties
  userName: string;

  password: string;

  email: string;

  userId: string;
  //#endregion

  constructor(
    userName: string,
    password: string,
    email: string,
    rarity: number = 21
  ) {
    this.userName = userName;
    this.password = password;
    this.email = email;
    const nanoid = customAlphabet(Constants.nanoIdAlphabet, rarity);
    this.userId = nanoid();
  }
}
