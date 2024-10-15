import { UserLevels, UserToggles } from "../enums";
import { Recipe } from "../Recipes/Recipe";
import { Pack } from "../Packs/Pack";
import { UserSettings } from "./UserSettings";
import { Constants}  from "../../../util/LumiMeals/Constants";
import { BaseUser } from "../../BaseUser";

/**
 * Definition of a user
 */
export class User extends BaseUser {
  //#region properties
  /**
   * the level of subscription or account
   */
  level: UserLevels[] = [UserLevels.Basic];

  /**
   * settings specific to the user
   */
  UserSettings: UserSettings = new UserSettings();

  /**
   * all packs bought by user
   */
  packsOwned: Pack[] = [];

  /**
   * the preset user toggles for recipe book
   * Preset to have all check except 0%
   * if number present, then it is off
   */
  UserToggles: UserToggles = 1;

  /**
   * all recipes owned by user
   * adds defaults on create
   * *Since they can edit things on the recipes
   * *we cant just pull them from the packs
   * *we could only store edited recipes, and pull rest from packs
   */
  recipes: Recipe[] = Constants.BaseRecipes;
  //#endregion

  /**
   * Definition of a user
   * @param userName
   * @param password
   * @param email
   */
  constructor(userName: string, password: string, email: string) {
    super(userName, password, email);
  }
}