import { Metrics } from "../enums";
import { Ingredient } from "./Ingredient";

export class IngredientMetric{
    //#region properties
    /**
     * ingredient type
     */
    ingredient: Ingredient;

    /**
     * amount needed
     */
    amount: number;

    /**
     * metric used
     */
    metric: Metrics;
//#endregion

    /**
     * How much of the specific ingredient for a specific recipe
     * @param ingredients 
     * @param amount 
     * @param metric 
     */
    constructor(ingredients: Ingredient, amount: number, metric: Metrics){
        this.ingredient = ingredients;
        this.amount = amount;
        this.metric = metric;
    }
}