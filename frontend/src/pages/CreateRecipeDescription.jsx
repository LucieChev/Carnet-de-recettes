import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import Joi from "joi";
import styles from "./CreateRecipe.module.css";
import instance from "../services/APIService";

export default function CreateRecipeDescription({
  formInfo,
  handleChange,
  prevStep,
}) {
  const [validationMessage, setValidationMessage] = useState(null);
  const schema = Joi.object({
    title: Joi.string().min(3).max(80).messages({
      "string.min":
        "Le titre doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Le titre doit avoir une longueur maximale de 80 caractères.",
    }),
    description: Joi.string().min(3).max(200).messages({
      "string.min":
        "La description doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "La description doit avoir une longueur maximale de 200 caractères.",
    }),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate(formInfo);

    if (error) {
      setValidationMessage(error.message);
    } else {
      setValidationMessage(null);
    }

    instance
      .post("/recipe/register", formInfo)
      .then((response) => {
        if (response.status === 201) {
          setValidationMessage(
            "La recette a bien été prise en compte, vous pouvez désormais la retrouver ici:"
          );
        }
      })
      .catch((err) => {
        if (err.response.status === 400)
          setValidationMessage("Erreur de saisie, veuillez recommencer");
      });
  };
  if (!formInfo) return null;

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>Ajouter les différents ingrédients</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Ingrédients"
          value={formInfo.description}
          onChange={handleChange}
          required
        />
        <div className={styles.buttons}>
          {validationMessage !==
          "La recette a bien été prise en compte, vous pouvez désormais la retrouver ici:" ? (
            <button type="button" onClick={prevStep}>
              Précédent
            </button>
          ) : null}
          {validationMessage === "Erreur de saisie, veuillez recommencer" ? (
            <Alert
              className={styles.validationMessage}
              severity={
                validationMessage === "Erreur de saisie, veuillez recommencer"
                  ? "error"
                  : "success"
              }
            >
              {validationMessage}
            </Alert>
          ) : null}
          {validationMessage !==
          "La recette a bien été prise en compte, vous pouvez désormais la retrouver ici:" ? (
            <button type="submit">Valider</button>
          ) : null}
          {validationMessage ===
          "La recette a bien été prise en compte, vous pouvez désormais la retrouver ici:" ? (
            <Alert
              className={styles.validationMessage}
              severity={
                validationMessage ===
                "La recette a bien été prise en compte, vous pouvez continuer."
                  ? "error"
                  : "success"
              }
            >
              {validationMessage}
            </Alert>
          ) : null}
          {validationMessage ===
          "La recette a bien été prise en compte, vous pouvez désormais la retrouver ici:" ? (
            <Link to="/recettes">
              <button type="button" className={styles.buttonNext}>
                Voir mes recettes
              </button>
            </Link>
          ) : null}
        </div>
      </form>
    </div>
  );
}

CreateRecipeDescription.propTypes = {
  formInfo: PropTypes.shape.isRequired,
  handleChange: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};
