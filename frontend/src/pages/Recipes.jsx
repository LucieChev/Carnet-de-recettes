import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Recipes.module.css";
import edit from "../assets/Icons/Pencil.svg";
import deleteIcn from "../assets/Icons/Delete.svg";
import instance from "../services/APIService";

export default function CreateRecipe() {
  const [recipesList, setRecipesList] = useState(null);
  /*   const [validationMessage, setValidationMessage] = useState(null);
   */
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
            <Link key={recipe.id} to={`/recette/${recipe.id}`}>
              <div className={styles.recipe}>
                <div className={styles.titleRecipe}>
                  <h3>{recipe.title}</h3>
                </div>
                <div className={styles.buttons}>
                  <img src={edit} alt="edit" className={styles.button} />
                  <img src={deleteIcn} alt="delete" className={styles.button} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
