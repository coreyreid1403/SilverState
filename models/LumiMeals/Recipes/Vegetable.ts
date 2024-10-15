import { Diets, Metrics } from "../enums";
import { Ingredient } from "./Ingredient";

export class Vegetable extends Ingredient{

     /**
      * An individual Vegetable
      * @param name 
      * @param brand 
      * @param metric 
      * @param diets 
      */
     constructor(name: string, brand: string | undefined, metric: Metrics | undefined, diets: Diets[] | undefined){
        super(name, brand, metric, diets);
     } 
}