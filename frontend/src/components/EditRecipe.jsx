import { useFormik } from "formik";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../services/APIService";
import styles from "./EditRecipe.module.css";

export default function EditRecipe({ setShowEdit }) {
  const { id } = useParams();

  const [recipeInfos, setRecipeInfos] = useState({
    title: "",
    description: "",
  });

  const [validationMessage, setValidationMessage] = useState(null);

  useEffect(() => {
    instance
      .get(`/recipe/${id}`)
      .then((res) => {
        setRecipeInfos({
          title: res.data.title,
          description: res.data.description,
        });
      })
      .catch((err) => {
        if (err.request?.status === 401) {
          setValidationMessage("La requete a échouée.");
        }
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: recipeInfos.title,
      description: recipeInfos.description,
    },

    onSubmit: async (values) => {
      try {
        const res = await instance.put(`/recipe/${id}`, values);
        if (res) {
          setValidationMessage("La recette a bien été modifiée.");
        } else throw new Error();
      } catch (error) {
        if (error.request?.status === 401) {
          setValidationMessage("La requête a échouée.");
        }
      }
    },
  });

  useEffect(() => {
    formik.values.title = recipeInfos.title;
    formik.values.description = recipeInfos.description;
  }, [recipeInfos]);

  if (!recipeInfos) return null;
  return (
    <div className={styles.blur_modal}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Modifier une recette</h3>
        <form
          action="add"
          onSubmit={formik.handleSubmit}
          className={styles.form}
        >
          <div className={styles.inputTitle}>
            <label htmlFor="title" className={styles.label}>
              Titre
            </label>
            <input
              type="title"
              name="title"
              id="title"
              required=""
              value={formik.values?.title}
              onChange={formik.handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputDescription}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <input
              type="description"
              name="description"
              id="description"
              required=""
              value={formik.values?.description}
              onChange={formik.handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.buttons}>
            {validationMessage === "La recette a bien été modifiée." ? (
              <Alert
                className={styles.validationMessage}
                severity={
                  validationMessage === "La recette a bien été modifiée."
                    ? "success"
                    : "error"
                }
              >
                {validationMessage}
              </Alert>
            ) : null}
            {validationMessage !== "La recette a bien été modifiée." ? (
              <button
                type="submit"
                onSubmit={formik.handleSubmit}
                className={styles.button}
              >
                Modifier
              </button>
            ) : null}

            {validationMessage !== "La recette a bien été modifiée." ? (
              <button
                type="button"
                className={styles.button}
                onClick={() => setShowEdit(false)}
              >
                Annuler
              </button>
            ) : null}

            {validationMessage === "La recette a bien été modifiée." ? (
              <Link to="/recettes">
                <button type="button" className={styles.button}>
                  Voir mes recettes
                </button>
              </Link>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

EditRecipe.propTypes = {
  setShowEdit: PropTypes.func.isRequired,
};
