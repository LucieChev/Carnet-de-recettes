import React from "react";
import PropTypes from "prop-types";
import styles from "./CreateRecipe.module.css";

export default function CreateRecipeTitle({
  formInfo,
  handleChange,
  nextStep,
}) {
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>Rentrez le titre de la recette</h1>
      </div>
      <div className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Titre de la recette"
          value={formInfo.title}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={nextStep}>
          Suivant
        </button>
      </div>
    </div>
  );
}

CreateRecipeTitle.propTypes = {
  formInfo: PropTypes.shape.isRequired,
  handleChange: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
