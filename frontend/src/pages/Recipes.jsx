import React, { useEffect, useState } from "react";
import styles from "./Recipes.module.css";
import RecipeDetails from "../components/RecipeDetails";
import APIService from "../services/APIService";

export default function CreateRecipe() {
  const [recipesList, setRecipesList] = useState(null);
  /*   const [validationMessage, setValidationMessage] = useState(null);
   */
  useEffect(() => {
    APIService.get(`/recipes`)
      .then((res) => {
        setRecipesList(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!recipesList) return null;
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>Mes recettes</h1>
      </div>
      <div className={styles.recipesList}>
        {recipesList.map((recipe) => (
          <RecipeDetails key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
