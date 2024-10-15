import { Diets, Price, RecipeCatagories, DifficultyLevel, Metrics } from "../../models/LumiMeals/enums";
import { Ingredient } from "../../models/LumiMeals/Recipes/Ingredient";
import { IngredientMetric } from "../../models/LumiMeals/Recipes/IngredientMetric";
import { Recipe } from "../../models/LumiMeals/Recipes/Recipe";

export class Constants {
  /**
   * The string name of the users email cookie
   */
  static readonly mealUserCookie = "currentMealUser";

  /**
   * Custom alphabet for nanoId
   */
  static readonly nanoIdAlphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

  /**
   * The preset recipes that come free
   */
  static readonly BaseRecipes: Recipe[] = [
    new Recipe(
      "Food1",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      ["Booze"],
      ["Brussels", "Broccoli"],
      "123e4567-e89b-12d3-a456-426614174000"
    ),
    new Recipe(
      "Food2",
      "default",
      "Sahara",
      [],
      2,
      [Diets.Vegan, Diets.LactoVegetarian],
      Price.Medium,
      2,
      2,
      [
        RecipeCatagories.CrockPot,
        RecipeCatagories.Fish,
        RecipeCatagories.European,
      ],
      [],
      ["1. asd"],
      DifficultyLevel.Intermediate,
      100,
      true,
      false,
      [],
      [],
      "123e4567-e89b-12d3-a456-426614174001"
    ),
    new Recipe(
      "Food3",
      "default",
      "Sahara",
      [],
      2,
      [Diets.LowCarb, Diets.LactoVegetarian],
      Price.High,
      1,
      1,
      [
        RecipeCatagories.Oven,
        RecipeCatagories.European,
        RecipeCatagories.European,
      ],
      [],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      [],
      [],
      "123e4567-e89b-12d3-a456-426614174002"
    ),
    new Recipe(
      "Food4",
      "default",
      "Sahara",
      [],
      2,
      [Diets.LowSugar, Diets.LactoVegetarian],
      Price.Extreme,
      1,
      1,
      [
        RecipeCatagories.Microwave,
        RecipeCatagories.Fish,
        RecipeCatagories.European,
      ],
      [],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      [],
      [],
      "123e4567-e89b-12d3-a456-426614174003"
    ),
    new Recipe(
      "Food5",
      "default",
      "Sahara",
      [],
      2,
      [Diets.None],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.Asian,
        RecipeCatagories.American,
        RecipeCatagories.European,
      ],
      [],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      [],
      [],
      "123e4567-e89b-12d3-a456-426614174004"
    ),
    new Recipe(
      "Food6",
      "default",
      "Sahara",
      [],
      2,
      [Diets.Kosher, Diets.LowCarb],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.Pasta,
        RecipeCatagories.Sandwich,
        RecipeCatagories.European,
      ],
      [],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      [],
      [],
      "123e4567-e89b-12d3-a456-426614174005"
    ),
    new Recipe(
      "Food7",
      "default",
      "Sahara",
      [],
      2,
      [Diets.Kosher, Diets.LowSugar],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.Chicken,
        RecipeCatagories.Pasta,
        RecipeCatagories.European,
      ],
      [],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      [],
      [],
      "123e4567-e89b-12d3-a456-426614174006"
    ),
    new Recipe(
      "Food8",
      "default",
      "Sahara",
      [],
      2,
      [Diets.Kosher, Diets.Vegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.Pork,
        RecipeCatagories.European,
        RecipeCatagories.European,
      ],
      [],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      [],
      [],
      "123e4567-e89b-12d3-a456-426614174007"
    ),
    new Recipe(
      "Food9",
      "default",
      "Sahara",
      [],
      2,
      [Diets.Kosher, Diets.Vegan],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.Beef,
        RecipeCatagories.Hispanic,
        RecipeCatagories.European,
      ],
      [],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      [],
      [],
      "123e4567-e89b-12d3-a456-426614174008"
    ),
    new Recipe(
      "Food10",
      "default",
      "Sahara",
      [],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      [],
      ["1. asd", "2. asdjqe"],
      DifficultyLevel.Beginner,
      0,
      true,
      false,
      [],
      [],
      "123e4567-e89b-12d3-a456-426614174009"
    ),
  ];

  /**
   * Testing recipes
   */
  static readonly TestingRecipes: Recipe[] = [
    new Recipe(
      "Test1",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      ["Booze"],
      ["Brussels", "Broccoli"],
      "123e4567-e89b-12d3-a456-426614174000"
    ),
    new Recipe(
      "Test2",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      ["Booze"],
      ["Brussels", "Broccoli"],
      undefined
    ),
    new Recipe(
      "Test3",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      ["Booze"],
      undefined,
      undefined
    ),
    new Recipe(
      "Test4",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      false,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test5",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      true,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test6",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      ["1. asd"],
      DifficultyLevel.Beginner,
      100,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test7",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      ["1. asd"],
      DifficultyLevel.Beginner,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test8",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      ["1. asd"],
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test9",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      ["1"],
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test10",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      [
        RecipeCatagories.AirFryer,
        RecipeCatagories.African,
        RecipeCatagories.European,
      ],
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test11",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test12",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test13",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      Price.Low,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test14",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      [Diets.Kosher, Diets.LactoVegetarian],
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test15",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      2,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test16",
      "default",
      "Sahara",
      [
        new IngredientMetric(
          new Ingredient("Poop", "Kroger", Metrics.Cup, [Diets.NoCarb]),
          10,
          Metrics.Cup
        ),
      ],
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test17",
      "default",
      "Sahara",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test18",
      "default",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
    new Recipe(
      "Test19",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ),
  ];

  /**
   * the base url
   */
  static readonly baseURL = process.env.NEXT_PUBLIC_HOST;

  /**
   * the base url for meals app
   */
  static readonly mealsBaseURL = Constants.baseURL + "/LumiMeals";

  /**
   * the base url for fundraising app
   */
  static readonly fundraisingBaseURL = Constants.baseURL + "/LumiFundraising";

  /**
   * Publishable key for stripe payments
   */
  static readonly stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  /**
   * If in test mode
   */
    static readonly testMode = process.env.NEXT_PUBLIC_VERCEL_ENV === 'development';

  static EditTableTitles(showAdvanced: boolean): string[] {
    return !showAdvanced
      ? this.editTableAdvancedTitles
      : this.editTableBasicTitles;
  }

  /**
   * Titles for the edit table
   */
  static readonly editTableAdvancedTitles: string[] = [
    "Serving Size",
    "Frequency",
    "Complexity",
    "Ingredients",
    "Related Recipes",
    "Steps",
    "Pairing Vegetables",
    "Additional Vegetables",
    "Side Needed",
    "Alcohol Pairing",
  ];

  /**
   * Titles for the edit table
   */
  static readonly editTableBasicTitles: string[] = [
    "Name",
    "Pack",
    "Creator",
    "Diets",
    "Catagories",
    "Expense",
    "Prep Time",
    "Cook Time",
    "Recipe",
    "Edit",
  ];

  //#region API Endpoints*******************************************************************************
  /**
   * Endpoint URL to sign up
   */
  static readonly endpointSignUp = "/api/LumiMeals/user/signUp";

  /**
   * Endpoint URL to sign in
   */
  static readonly endpointSignIn = "/api/LumiMeals/user/signIn";

  /**
   * Endpoint get user by email
   */
  static readonly endpointGetUser = "/api/LumiMeals/user/getUser";

  /**
   * Endpoint get update user
   */
  static readonly endpointUpdateUser = "/api/LumiMeals/user/updateUser";
  //#endregion
}