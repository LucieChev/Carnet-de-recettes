import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipeDetails.module.css";
import instance from "../services/APIService";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    instance
      .get(`/recipe/${id}`)
      .then((response) => setRecipe(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (!recipe) return null;

  return (
    <div className={styles.page}>
      <div className={styles.recipe}>
        <h2>{recipe.title}</h2>
        <h3>{recipe.description}</h3>
      </div>
    </div>
  );
}
