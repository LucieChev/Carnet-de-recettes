import React from "react";
import PropTypes from "prop-types";
import styles from "./RecipeDetails.module.css";

export default function RecipeDetails({ recipe }) {
  return (
    <li className={styles.listBox}>
      <div className={styles.userContent}>
        <h3 className={styles.userName}>{recipe.title}</h3>
        <h3 className={styles.userEmail}>{recipe.description}</h3>
      </div>
    </li>
  );
}
RecipeDetails.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
