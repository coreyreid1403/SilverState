 /**
 * Metrics
 */
  export enum Metrics {
    NotSelected = 'NotSelected',
    Milligrams = 'Milligrams',
    Milliliters = 'Milliliters',
    Grams = 'Grams',
    Liters = 'Liters',
    Gallon = 'Gallon',
    TableSpoon = 'TableSpoon',
    TeaSpoon = 'TeaSpoon',
    FluidOunce = 'FluidOunce',
    Ounce = 'Ounce',
    Cup = 'Cup'
  }

 /**
 * List of all available diets
 */
export enum Diets {
  None = "None",
  LowCarb = "LowCarb",
  NoCarb = "NoCarb",
  LowSugar = "LowSugar",
  NoSugar = "NoSugar",
  Vegan = "Vegan",
  Vegetarian = "Vegetarian",
  LactoVegetarian = "LactoVegetarian",
  Kosher = "Kosher",
}

/**
 * The price of the recipe
 */
export enum Price {
  NotSelected = "NotSelected",
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Extreme = "Extreme",
}

/**
 * Types a recipe can be
 */
 export enum RecipeCatagories {
   //meats
   Chicken = "Chicken",
   Beef = "Beef",
   Pork = "Pork",
   Turkey = "Turkey",
   Fish = "Fish",
   //cooking device
   CrockPot = "CrockPot",
   InstaPot = "InstaPot",
   AirFryer = "AirFryer",
   Oven = "Oven",
   StoveTop = "StoveTop",
   Microwave = "Microwave",
   //culture
   Asian = "Asian",
   American = "American",
   Hispanic = "Hispanic",
   European = "European",
   African = "African",
   //base ingredient
   Soup = "Soup",
   Pasta = "Pasta",
   Sandwich = "Sandwich",
   Salad = "Salad",
   Casserole = "Casserole",
 }

/**
 * The cooking difficulty of the recipe
 */
export enum DifficultyLevel {
  NotSelected = "NotSelected",
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Expert = "Expert",
}

/**
 * The tiers a user can be
 */
export enum UserLevels {
  Basic = 'Basic',
  MoreMemory = 'MoreMemory',
  Admin = 'Admin'
}

/**
 * The selected toggles on the recipe book page
 */
export enum UserToggles {
  ShowZero = 1,
  Name = 2,
  Pack = 4,
  Creator = 8,
  Ingredients = 16,
  ServingSize = 32,
  Diets = 64,
  Expense = 128,
  PrepTime = 256,
  CookTime = 512,
  Catagories = 1024,
  RelatedRecipes = 2048,
  Steps = 4096,
  Complexity = 8192,
  Frequency = 16384,
  AdditionalVegetables = 32768,
  SideNeeded = 65536,
  AlcoholPairing = 131072,
  PairingVegetables = 262144,
  Recipe = 524288,
  Edit = 1048576,
}