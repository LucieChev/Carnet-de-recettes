import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Recipes.module.css";
import instance from "../services/APIService";

export default function CreateRecipe() {
  const [recipesList, setRecipesList] = useState(null);

  useEffect(() => {
    instance
      .get(`/recipes`)
      .then((res) => {
        setRecipesList(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!recipesList) return null;
  return (
    <div className={styles.page}>
      <div className={styles.recipesList}>
        <div className={styles.title}>
          <h1>Mes recettes</h1>
        </div>
        {recipesList.map((recipe) => (
          <div className={styles.cardRecipe} key={recipe.id}>
            <div className={styles.recipe}>
              <Link key={recipe.id} to={`/recette/${recipe.id}`}>
                <div className={styles.titleRecipe}>
                  <h3>{recipe.title}</h3>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
