import { Recipe } from "../Recipes/Recipe";
import { Promo } from "./Promo";

/**
 * A recipe pack
 */
export class Pack {
  //#region properties
  /**
   * Name of pack
   */
  name: string;

  /**
   * name of creator
   */
  creator: string;

  /**
   * the recipes contained in the pack
   */
  recipes: Recipe[];

  /**
   * price of pack
   */
  price: string;

  /**
   * list of users pack is free for
   */
  whiteList: string[];

  /**
   * Promotion information
   */
  promo: Promo;
//#endregion

  /**
   * Recipe Pack
   * @param name 
   * @param creator 
   * @param recipes 
   * @param price 
   * @param whiteList 
   * @param promo 
   */
  constructor(
    name: string,
    creator: string,
    recipes: Recipe[],
    price: string,
    whiteList: string[],
    promo: Promo
  ) {
    this.name = name;
    this.creator = creator;
    this.recipes = recipes;
    this.price = price;
    this.whiteList = whiteList;
    this.promo = promo;
  }
}
