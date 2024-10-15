import { Metrics } from "../enums";

/**
 * Nutritional facts per serving
 */
export class NutritionalFacts{
   //#region properties
   /**
     * amount per serving
     */
    amount: number;

    /**
     * metric used
     */
    metric: Metrics;

    /**
    * calories per serving
    */
     calories: number;

     /**
     * protein per serving
     */
     protein: number;
 
     /**
     * sugar per serving
     */
     sugar: number;

     /**
      * TODO: make image type
      * The nutritional label
      */
     nutritionalFactsImage: string | undefined;
//#endregion

     /**
      * The nutritional facts per serving of a recipe
      * @param calories 
      * @param protein 
      * @param sugar 
      */
     constructor(amount: number, metric: Metrics, calories: number, protein: number, sugar: number){
        this.amount = amount;
        this.metric = metric;
        this.calories = calories;
        this.protein = protein;
        this.sugar = sugar;
     }
 
}