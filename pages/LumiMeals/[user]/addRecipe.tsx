import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import AlertPopUp from "../../../views/popups/AlertPopUp";
import { useRouter } from "next/router";
import styles from "../styles/pages/addRecipe.module.css";
import {
  Diets,
  DifficultyLevel,
  RecipeCatagories,
  Price,
} from "../../../models/LumiMeals/enums";
import { Recipe } from "../../../models/LumiMeals/Recipes/Recipe";
import GlobalVariables from "../../../util/LumiMeals/GlobalVariables";
import { IngredientMetric } from "../../../models/LumiMeals/Recipes/IngredientMetric";
import { User } from "../../../models/LumiMeals/User/User";
import Select, { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import StyledContainer from "../../../views/StyledContainer";

const AddRecipe: NextPage = () => {
  let globals = GlobalVariables.getInstance();

  /**
   * Var for getting param from route
   */
  const router = useRouter();
  const data = router.query;
  const userId = data.user;
  const recipeId = data.recipeId;
  //if we have set up data or not
  const dataFetchedRef = useRef(false);

  /**
   * runs once
   */
  useEffect(() => {
    if (
      !dataFetchedRef.current &&
      typeof userId === "string" &&
      typeof recipeId === "string"
    ) {
      populateWithSelectedRecipe(recipeId);
    }
    dataFetchedRef.current = true;

    const getUser = async () => {
      const user = await globals?.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expenses = Object.values(Price).map((key, index) => ({
    value: index,
    label: key,
  }));
  const [selectedExpense, setSelectedExpense] = useState<{
    value: number;
    label: Price;
  }>();
  function setExpense(expenseToSet: Price) {
    return expenses.find((expense) => {
      if (expense.label === expenseToSet) {
        return expense;
      }
    });
  }

  const complexities = Object.values(DifficultyLevel).map((key, index) => ({
    value: index,
    label: key,
  }));
  const [selectedComplexity, setSelectedComplexity] = useState<{
    value: number;
    label: DifficultyLevel;
  }>();
  function setComplexity(complexityToSet: DifficultyLevel) {
    return complexities.find((comp) => {
      if (comp.label === complexityToSet) {
        return comp;
      }
    });
  }

  const diets = Object.values(Diets).map((key, index) => ({
    value: index,
    label: key,
  }));
  const [selectedDiets, setSelectedDiets] = useState<
    { value: number; label: Diets }[]
  >([]);
  function setDiets(dietsToSet: Diets[]) {
    let list: { value: number; label: Diets }[] = [];
    dietsToSet.map((di) => {
      diets.find((diet) => {
        if (diet.label === di) {
          list.push(diet);
        }
      });
    });
    return list;
  }

  const catagories = Object.values(RecipeCatagories).map((key, index) => ({
    value: index,
    label: key,
  }));
  const [selectedCatagories, setSelectedCatagories] = useState<
    { value: number; label: RecipeCatagories }[]
  >([]);
  function setCatagories(catagoriesToSet: RecipeCatagories[]) {
    let list: { value: number; label: RecipeCatagories }[] = [];
    catagoriesToSet.map((cat) => {
      catagories.find((category) => {
        if (category.label === cat) {
          list.push(category);
        }
      });
    });
    return list;
  }

  //TODO: make list of all recipes
  const relatedRecipes: {
    value: string;
    label: string;
  }[] = [];
  const [selectedRelatedRecipes, setSelectedRelatedRecipes] = useState<
    { value: string; label: string }[]
  >([]);
  function setRelatedRecipes(recipesToSet: string[]) {
    return recipesToSet.map((rec) => {
      return {
        value: rec,
        label: rec,
      };
    });
  }

  const [veggieList, setVeggieList] = useState<
    { value: string; label: string }[]
  >([]);
  function setSelectedVeggies(
    veggiesToSet: string[]
  ): { value: string; label: string }[] {
    let list: { value: string; label: string }[] = [];
    veggiesToSet.map((veggie) => {
      if (veggie && veggie.length > 0) {
        list.push({
          value: veggie,
          label: veggie,
        });
      }
    });
    return list;
  }

  const [alcoholList, setAlcoholList] = useState<
    { value: string; label: string }[]
  >([]);
  function setSelectedAlcohol(alcoholToSet: string[]) {
    let list: { value: string; label: string }[] = [];
    alcoholToSet.map((alcohol) => {
      if (alcohol && alcohol.length > 0) {
        list.push({
          value: alcohol,
          label: alcohol,
        });
      }
    });
    return list;
  }

  const [addVeg, setAddVeg] = useState(false);
  const [sideNeeded, setSideNeeded] = useState(false);
  // const [submitPressed, setSubmitPressed] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);

  const arrow: string = "->";

  /**
   * var for success popup
   */
  const [showPopUP, setShowPopUP] = useState(false);
  const [success, setSuccess] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const togglePopUp = () => setShowPopUP(!showPopUP);

  /**
   * Fill in form with recipe information for editing
   * @param user
   * @param recipeId
   */
  async function populateWithSelectedRecipe(recipeId: string) {
    const user = await globals?.getUser();
    const recipe = user?.recipes.find((recipe) => recipe?.id === recipeId);
    if (recipe) {
      //set Creator //TODO: not getting set
      document
        .getElementById("creatorInput")
        ?.setAttribute("value", recipe.creator);
      //set Pack //TODO: not getting set
      document.getElementById("packInput")?.setAttribute("value", recipe.pack);
      //set name
      document.getElementById("nameInput")?.setAttribute("value", recipe.name);
      //set serving size
      document
        .getElementById("servingInput")
        ?.setAttribute("value", recipe.serving_size.toString());
      //set prep time
      document
        .getElementById("prepInput")
        ?.setAttribute("value", recipe.prep_time.toString());
      //set cook time
      document
        .getElementById("cookInput")
        ?.setAttribute("value", recipe.cook_time.toString());
      //set frequency
      document
        .getElementById("frequencyInput")
        ?.setAttribute("value", recipe.frequency.toString());
      //set additional veg
      setAddVeg(recipe.additional_vegetable);
      //set selected veggies
      setVeggieList(setSelectedVeggies(recipe.pairing_vegetables) ?? []);
      //set side needed
      setSideNeeded(recipe.side_needed);
      //set expense
      setSelectedExpense(setExpense(recipe.expense));
      //set complexity //TODO: not getting set
      setSelectedComplexity(setComplexity(recipe.complexity));
      //set diets
      setSelectedDiets(setDiets(recipe.diets));
      //set catagories
      setSelectedCatagories(setCatagories(recipe.category));
      //set diets
      setSelectedRelatedRecipes(setRelatedRecipes(recipe.related_recipes));
      //pairing alcohol
      setAlcoholList(setSelectedAlcohol(recipe.alcohol_pairing) ?? []);

      //TODO: set ingredients
      // document
      //   .getElementById("ingredientsInput")
      //   ?.setAttribute("value", recipe.complexity.toString());

      //steps
      // document
      //   .getElementById("stepsInput")
      //   ?.setAttribute("value", recipe.steps.toString());
    } else {
      console.log("Could not find recipe");
      //set Creator
      document
        .getElementById("creatorInput")
        ?.setAttribute("value", user?.userName ?? "");
      //set Pack
      document
        .getElementById("packInput")
        ?.setAttribute("value", (user?.userName ?? "") + " Pack");
    }
  }

  function clearFields() {
    //set Creator
    document
      .getElementById("creatorInput")
      ?.setAttribute("value", user?.userName ?? "");
    //set Pack
    document
      .getElementById("packInput")
      ?.setAttribute("value", (user?.userName ?? "") + " Pack");
    //set name
    document.getElementById("nameInput")?.setAttribute("value", "");
    //set serving size
    document.getElementById("servingInput")?.setAttribute("value", "");
    //set prep time
    document.getElementById("prepInput")?.setAttribute("value", "");
    //set cook time
    document.getElementById("cookInput")?.setAttribute("value", "");
    //set frequency
    document.getElementById("frequencyInput")?.setAttribute("value", "");
    //set additional veg
    setAddVeg(false);
    //set pairing Veggies
    setVeggieList([]);
    //set side needed
    setSideNeeded(false);
    //set expense
    setSelectedExpense(undefined);
    //set alcohol
    setSelectedAlcohol([]);
    //set complexity
    setSelectedComplexity(undefined);
    //set diets
    setSelectedDiets([]);
    //set catagories
    setSelectedCatagories([]);
    //set diets
    setSelectedRelatedRecipes([]);
    //set ingredients
    document.getElementById("ingredientsInput")?.setAttribute("value", "");
  }

  //#region update functions
  /**
   * Helper for pairing veggie dropdown
   * @param veggie
   */
  function updateVeggies(veggie: MultiValue<{ value: string; label: string }>) {
    //convert to dropdown item
    let newerList = veggie?.map((veg) => {
      //idk why but it wants the space
      return { value: veg.value + " ", label: veg.label + " " };
    });
    setVeggieList(newerList);
  }

  /**
   * Helper for pairing alcohol dropdown
   * @param veggie
   */
  function updateAlcohol(
    alcohol: MultiValue<{ value: string; label: string }>
  ) {
    //convert to dropdown item
    let newerList = alcohol?.map((alc) => {
      //idk why but it wants the space
      return { value: alc.value + " ", label: alc.label + " " };
    });
    setAlcoholList(newerList);
  }
  //#endregion

  /**
   * SignUp on click method
   * @param fields array of inputs
   */
  async function onSubmit(fields: any, update: boolean) {
    console.error("ran???");
    let userId = user?.userId;
    let expense: Price | undefined;
    let complexity: DifficultyLevel | undefined;
    let diets: Diets[] = [];
    let catagories: RecipeCatagories[] = [];
    let relatedRecipes: string[] = [];
    if (userId) {
      let name: string = fields.target.nameInput.value;
      let creator: string = fields.target.creatorInput.value;
      let pack: string = fields.target.packInput.value;
      let servingSize: number = fields.target.servingInput.value;
      let prepTime: number = fields.target.prepInput.value;
      let cookTime: number = fields.target.cookInput.value;
      let frequency: number = fields.target.frequencyInput.value;
      let addVeg: boolean = fields.target.addVegInput.checked;
      let addSide: boolean = fields.target.sideNeededInput.checked;
      let ingredients: IngredientMetric[] =
        fields.target.ingredientsInput.value; // TODO: wont work
      let steps: string[] = [fields.target.stepsInput.value]; // TODO: probably doesn't work

      let selectedVeggies: string[] = [];
      if (veggieList) {
        selectedVeggies = veggieList.map((veg) => veg.label);
      }

      let alcohol: string[] = [];
      if (alcoholList) {
        alcohol = alcoholList.map((alcohol) => alcohol.label);
      }

      if (selectedExpense) {
        const unknownNumber: unknown = selectedExpense.label;
        const toEnum = unknownNumber as Price;
        expense = Price[toEnum];
      }

      if (selectedComplexity) {
        const unknownString: unknown = selectedComplexity.label;
        const toEnum = unknownString as DifficultyLevel;
        complexity = DifficultyLevel[toEnum];
      }

      if (selectedDiets && selectedDiets.length > 0) {
        selectedDiets.map((diet) => {
          const unknownString: unknown = diet.label;
          const toEnum = unknownString as Diets;
          diets.push(Diets[toEnum]);
        });
      }

      if (selectedCatagories && selectedCatagories.length > 0) {
        selectedCatagories.map((catatony) => {
          const unknownString: unknown = catatony.label;
          const toEnum = unknownString as RecipeCatagories;
          catagories.push(RecipeCatagories[toEnum]);
        });
      }

      if (selectedRelatedRecipes && selectedRelatedRecipes.length > 0) {
        selectedRelatedRecipes.map((recipe) => {
          relatedRecipes.push(recipe.label);
        });
      }

      // if frequency isn't set, default 100
      if (!frequency) {
        frequency = 100;
      }

      let recipe: Recipe = new Recipe(
        name,
        pack,
        creator,
        undefined, //ingredients, // TODO
        servingSize,
        diets,
        expense,
        prepTime,
        cookTime,
        catagories,
        relatedRecipes,
        steps,
        complexity,
        frequency,
        addVeg,
        addSide,
        alcohol,
        selectedVeggies,
        undefined
      );
      console.log(recipe);
      //if we have a recipeId, then this is an update
      if (
        // submitPressed === "update" &&
        update &&
        recipeId &&
        recipeId.length > 0 &&
        user
      ) {
        var index = user.recipes.findIndex((recipe) => recipe?.id === recipeId);
        if (index !== -1) {
          recipe.id = recipeId as string;
          user.recipes[index] = recipe;
        }
        //if we cant find it, just add it instead
        else {
          user.recipes.push(recipe);
        }
        router.back();
      } else {
        user?.recipes.push(recipe);
      }

      //update user
      let error = await globals?.setUser(user);
      if (error && error.length > 0) {
        setSuccess(false);
        setPopUpMessage("There was an error adding your recipe: " + error);
        togglePopUp();
      } else {
        setPopUpMessage("Successfully added recipe");
        setSuccess(true);
        togglePopUp();
        clearFields();
      }
    }
  }

  return (
    <StyledContainer center={true}>
        {/* Popup success or failure message */}
        <AlertPopUp
          showPopUP={showPopUP}
          togglePopUp={togglePopUp}
          title="Adding Recipe"
          good={success}
          message={popUpMessage}
        />
        <h1>Add Recipes</h1>
        <form
          className={styles.form}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   onSubmit(e);
          // }}
        >
          <fieldset className={styles.fieldset}>
            <legend>Recipe Info</legend>
            <label htmlFor="field1" className={styles.label}>
              <span>
                Name <span className={styles.required}>*</span>
              </span>
              <input
                type="text"
                className={styles.input}
                id="nameInput"
                required
              />
            </label>
            <label htmlFor="field121" className={styles.label}>
              <span>
                Creator <span className={styles.required}>*</span>
              </span>
              <input
                type="text"
                className={styles.input}
                id="creatorInput"
                required
              />
            </label>
            <label htmlFor="field31" className={styles.label}>
              <span>
                Pack <span className={styles.required}>*</span>
              </span>
              <input
                type="text"
                className={styles.input}
                id="packInput"
                required
              />
            </label>
            <label htmlFor="field2" className={styles.label}>
              <span>Serving Size</span>
              <input type="number" className={styles.input} id="servingInput" pattern="\d*"/>
            </label>
            <label htmlFor="field3" className={styles.label}>
              <span>Prep Time</span>
              <input type="number" className={styles.input} id="prepInput" pattern="\d*"/>
              <p>min</p>
            </label>
            <label htmlFor="field3" className={styles.label}>
              <span>Cook Time</span>
              <input type="number" className={styles.input} id="cookInput" pattern="\d*"/>
              <p>min</p>
            </label>
            <label htmlFor="field3" className={styles.label}>
              <span>Frequency</span>
              <input
                type="number"
                className={styles.input}
                id="frequencyInput"
                step="10"
                pattern="\d*"
              />
              <p>%</p>
            </label>
            <label htmlFor="field3" className={styles.label}>
              <span>Additional Vegetable</span>
              <input
                type="checkbox"
                checked={addVeg}
                onChange={() => setAddVeg(!addVeg)}
                className={styles.input}
                id="addVegInput"
              />
            </label>

            <label htmlFor="field3" className={styles.label}>
              <span>Pairing Vegetable</span>
              <CreatableSelect
                isMulti
                isClearable
                options={veggieList}
                onChange={(change) => updateVeggies(change)}
              />
            </label>

            <label htmlFor="field3" className={styles.label}>
              <span>Side Needed</span>
              <input
                type="checkbox"
                checked={sideNeeded}
                onChange={() => setSideNeeded(!sideNeeded)}
                className={styles.input}
                id="sideNeededInput"
              />
            </label>

            <label htmlFor="field3" className={styles.label}>
              <span>Alcohol Pairing</span>
              <CreatableSelect
                id="alcoholInput"
                isMulti
                isClearable
                options={alcoholList}
                onChange={(change) => updateAlcohol(change)}
              />
            </label>

            <label htmlFor="field4" className={styles.label}>
              <span>Complexity</span>
              <Select
                id="complexity"
                className="basic-single"
                classNamePrefix="select"
                value={selectedComplexity}
                isClearable={true}
                name="complexity"
                options={complexities}
                onChange={(change) => setSelectedComplexity(change as any)}
              />
            </label>

            <label htmlFor="field4" className={styles.label}>
              <span>Expense</span>
              <Select
                id="expense"
                className="basic-single"
                classNamePrefix="select"
                value={selectedExpense}
                isClearable={true}
                name="expense"
                options={expenses}
                onChange={(change) => setSelectedExpense(change as any)}
              />
            </label>

            <label htmlFor="field4" className={styles.label}>
              <span>Diets</span>
              <Select
                isMulti
                name="diets"
                options={diets}
                classNamePrefix="select"
                value={selectedDiets}
                isClearable={true}
                onChange={(change) => setSelectedDiets(change as any)}
              />
            </label>

            <label htmlFor="field4" className={styles.label}>
              <span>Catagories</span>
              <Select
                isMulti
                name="catagories"
                options={catagories}
                classNamePrefix="select"
                value={selectedCatagories}
                isClearable={true}
                onChange={(change) => setSelectedCatagories(change as any)}
              />
            </label>

            <label htmlFor="field4" className={styles.label}>
              <span>Related Recipes</span>
              <Select
                isMulti
                name="relatedRecipes"
                options={relatedRecipes}
                classNamePrefix="select"
                value={selectedRelatedRecipes}
                isClearable={true}
                onChange={(change) => setSelectedRelatedRecipes(change as any)}
              />
            </label>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Steps</legend>
            <label htmlFor="field6" className={styles.label}>
              {/* //TODO: Need to fix to actually do ingredients?
               */}
              <span>Ingredients</span>
              <textarea
                name="field6"
                className={styles.textarea}
                id="ingredientsInput"
                rows={5}
              ></textarea>
            </label>
            <label htmlFor="field6" className={styles.label}>
              {/* //TODO: change steps to input individual steps???
               */}
              <span>Steps</span>
              <textarea
                name="field6"
                className={styles.textarea}
                id="stepsInput"
                rows={5}
              ></textarea>
            </label>
            <label className={styles.label}>
              <span> </span>
              <input
                onClick={(e) => {
                  e.preventDefault();
                  // setSubmitPressed("submit");
                  onSubmit(e, false);
                }}
                type="submit"
                value="Create New"
              />
              <input
                onClick={(e) => {
                  e.preventDefault();
                  // setSubmitPressed("update");
                  onSubmit(e, true);
                }}
                hidden={recipeId === undefined}
                type="submit"
                value="Update Existing"
              />
            </label>
          </fieldset>
        </form>
    </StyledContainer>
  );
};

export default AddRecipe;
