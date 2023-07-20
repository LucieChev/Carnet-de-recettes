import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipeDetails.module.css";
import instance from "../services/APIService";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";
import edit from "../assets/Icons/Pencil.svg";
import deleteIcn from "../assets/Icons/Delete.svg";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    instance
      .get(`/recipe/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!recipe) return null;
  return (
    <div className={styles.page}>
      <div className={styles.recipe}>
        <h2>{recipe.title}</h2>
        <h3>{recipe.description}</h3>
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.buttonEdit}
          onClick={() => {
            setShowEdit(true);
          }}
        >
          <img src={edit} alt="edit" />
        </button>
        <button
          type="button"
          className={styles.buttonDelete}
          onClick={() => {
            setShowDelete(true);
          }}
        >
          <img src={deleteIcn} alt="delete" />
        </button>
      </div>
      <div className={styles.modal}>
        {showEdit ? <EditRecipe setShowEdit={setShowEdit} /> : null}
        {showDelete ? <DeleteRecipe setShowDelete={setShowDelete} /> : null}
      </div>
    </div>
  );
}
