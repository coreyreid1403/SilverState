import { Diets, Metrics } from "../enums";

export class Ingredient {
  //#region properties
  /**
   * name of the ingredient
   */
  name: string;

  /**
   * name of the brand
   */
  brand?: string;

  // /**
  // * Nutritional facts for the ingredient per serving
  // */
  // nutritional_Facts?: NutritionalFacts;

  /**
   * Which diets this ingredient is a part of
   */
  diets?: Diets[];

  /**
   * List of other brands/varieties of same ingredient
   */
  differentVarieties: Ingredient[] = [];
  //#endregion

  /**
   * An individual ingredient
   * @param name
   * @param brand
   * @param metric
   * @param diets
   */
  constructor(
    name: string,
    brand: string | undefined,
    metric: Metrics | undefined,
    diets: Diets[] | undefined
  ) {
    this.name = name;
    this.brand = brand;
    this.diets = diets;
    // this.nutritional_Facts = this.getNutritionalFacts(name, brand)
  }

  //#region Methods
  //  /**
  //   * TODO: Gets the Nutritional facts for ingredient
  //   * @param name
  //   * @param brand
  //   * @returns
  //   */
  // getNutritionalFacts(name: string, brand: string): NutritionalFacts | undefined {
  //     return undefined;
  // }

  //#endregion
}