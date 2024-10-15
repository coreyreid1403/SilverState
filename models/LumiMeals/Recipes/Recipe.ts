import { Diets, RecipeCatagories, Price, DifficultyLevel, Metrics } from "../enums";
import { IngredientMetric } from "./IngredientMetric";
import { nanoid } from 'nanoid'

/**
 * The outline of a Recipe
 */
export class Recipe {
  //#region properties

  /**
   * Recipe ID
   */
  id: string;

  /**
   * Name of the Recipe
   * */
  name: string;

  /**
   * Pack it is part of
   */
  pack: string;

  /**
   * Pack it is part of
   */
  creator: string;

  /**
   * All ingredients
   */
  ingredients: IngredientMetric[];

  /**
   * Number of servings in recipe
   */
  serving_size: number;

  /**
   * Which diets this Recipe is a part of
   */
  diets: Diets[];

  /**
   * the price of the Recipe
   */
  expense: Price;

  /**
   * time in min it takes to prep
   */
  prep_time: number;

  /**
   * time in min it takes to cook
   */
  cook_time: number;

  /**
   * the list of categories it falls under
   */
  category: RecipeCatagories[];

  /**
   * other recipes that are the same, but changed for different diets
   * list of the ids
   */
  related_recipes: string[];

  /**
   * steps to make Recipe
   */
  steps: string[];

  /**
   * the experience level
   */
  complexity: DifficultyLevel;

  /**
   * How frequent this Recipe should appear. Default 100
   */
  frequency: number;

  /**
   * if an additional vegetable is required to have a balanced Recipe
   */
  additional_vegetable: boolean;

  /**
   * list of vegetables that fit the dish best
   */
  // pairing_vegetables: Vegetable[];
  pairing_vegetables: string[];

  /**
   * if a additional side is needed to have a balanced Recipe
   */
  side_needed: boolean;

  /**
   * Which alcohol pairs best with food
   */
  alcohol_pairing: string[];

  // /**
  //  * Nutritional facts for the Recipe per serving
  //  */
  // nutritional_facts?: NutritionalFacts;

  //#endregion

  /**
   *Only name is required. Undefined for all unknowns.
   * @param id
   * @param name Only Required
   * @param packName
   * @param packCreator
   * @param ingredients
   * @param servingSize
   * @param diets
   * @param expense
   * @param prep_time
   * @param cook_time
   * @param category
   * @param relatedRecipes
   * @param steps
   * @param complexity
   * @param frequency Default 100'
   * @param vegetableNeeded 
   * @param sideNeeded 
   * @param alcoholPairing
   */
  constructor(
    name: string,
    packName: string | undefined,
    packCreator: string | undefined,
    ingredients: IngredientMetric[] | undefined,
    servingSize: number | undefined,
    diets: Diets[] | undefined,
    expense: Price | undefined,
    prep_time: number | undefined,
    cook_time: number | undefined,
    category: RecipeCatagories[] | undefined,
    relatedRecipes: string[] | undefined,
    steps: string[] | undefined,
    complexity: DifficultyLevel | undefined,
    frequency: number | undefined,
    vegetableNeeded: boolean | undefined,
    sideNeeded: boolean | undefined,
    alcoholPairing: string[] | undefined,
    pairingVegetables: string[] | undefined,
    id: string | undefined
  ) {
    this.name = name;
    this.pack = packName ?? "";
    this.creator = packCreator ?? "";
    this.ingredients = ingredients ?? [];
    this.serving_size = servingSize ?? 0;
    this.diets = diets ?? [];
    this.expense = expense ?? Price.NotSelected;
    this.prep_time = prep_time ?? 0;
    this.cook_time = cook_time ?? 0;
    this.category = category ?? [];
    this.related_recipes = relatedRecipes ?? [];
    this.steps = steps ?? [];
    this.complexity = complexity ?? DifficultyLevel.NotSelected;
    this.frequency = frequency ?? 100;
    this.additional_vegetable = vegetableNeeded ?? false;
    this.side_needed = sideNeeded ?? false;
    this.alcohol_pairing = alcoholPairing ?? [];
    this.pairing_vegetables = pairingVegetables ?? [];
    this.id = id ?? nanoid();
    // this.nutritional_facts = this.calculateNutritionalFacts(
    //   ingredients,
    //   servingSize
    // );
  }

  //#region Methods

  // /**
  //  * Calculates the nutritional facts based on ingredients and serving size
  //  * @param ingredients
  //  * @param servingSize
  //  */
  // calculateNutritionalFacts(
  //   ingredients: IngredientMetric[],
  //   servingSize: number
  // ): NutritionalFacts {
  //   return new NutritionalFacts(0, Metrics.Cup, 0, 0, 0);
  // }

  //#endregion
}