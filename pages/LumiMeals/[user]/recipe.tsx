import type { NextPage } from "next";
import { useState } from "react";
import AlertPopUp from "../../../views/popups/AlertPopUp";
import { useRouter } from "next/router";
import StyledContainer from "../../../views/StyledContainer";
import { Title } from "../../../styles/SharedStyles";

const Recipe: NextPage = () => {
  /**
   * Var for getting param from route
   */
  const router = useRouter();
  const data = router.query;
  const user = data.user;
  const recipeId = data.recipeId;

  /**
   * var for success popup
   */
  const [showPopUP, setShowPopUP] = useState(false);
  const [success, setSuccess] = useState(false);
  const togglePopUp = () => setShowPopUP(!showPopUP);

  return (
    <StyledContainer center={true}>
        {/* Popup success or failure message */}
        <AlertPopUp
          showPopUP={showPopUP}
          togglePopUp={togglePopUp}
          title="Adding Recipe"
          good={success}
          message={
            success
              ? "Recipe Downloaded"
              : "There was an error downloading your recipe"
          }
        />

        <Title>Recipe</Title>
        <button
          onClick={() => {
            console.log(data);
          }}
        >
          Print For user: {user} RecipeID: {recipeId}
        </button>
    </StyledContainer>
  );
};

export default Recipe;
