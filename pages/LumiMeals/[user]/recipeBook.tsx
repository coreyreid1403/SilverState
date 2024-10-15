import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Recipe } from '../../../models/LumiMeals/Recipes/Recipe';
import GlobalVariables from '../../../util/LumiMeals/GlobalVariables';
import RecipeTable from '../../../views/Table/RecipeTable';
import StyledContainer from '../../../views/StyledContainer';
import { Title } from '../../../styles/SharedStyles';

const RecipeBook: NextPage = () => {
  //if we have set up data or not
  const dataFetchedRef = useRef(false);
  let globals = GlobalVariables.getInstance();

  let emptyArray: Recipe[] = [];
  const [recipes, setRecipe] = useState(emptyArray);
  //TODO: toggles not switching
  /**
   * runs once
   */
  useEffect(() => {
    // declare inner function to enable async in useEffect
    const getData = async () => {
      const recipes = await getRecipes();
      if (recipes) {
        setRecipe(recipes);
      }
    };
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getRecipes() {
    const user = await globals?.getUser();
    return user?.recipes;
  }
  return (
    <StyledContainer center={true}>
      <Title>Recipe Book</Title>
      <RecipeTable recipes={getRecipes()} showFrequencyZero={false} />
    </StyledContainer>
  );
};

export default RecipeBook;
