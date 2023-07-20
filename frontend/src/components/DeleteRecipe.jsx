import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { Alert } from "@mui/material";
import instance from "../services/APIService";
import styles from "./DeleteRecipe.module.css";

export default function DeleteRecipe({ setShowDelete }) {
  const { id } = useParams();
  const [validationMessage, setValidationMessage] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await instance.delete(`/recipe/${id}`);
      if (res) {
        setValidationMessage("La recette a bien été supprimée.");
      } else throw new Error();
    } catch (error) {
      if (error.request?.status === 401) {
        setValidationMessage("La requête a échouée.");
      }
    }
  };
  const handleCloseModal = () => {
    setShowDelete(false);
  };
  const handleClick = () => {
    handleDelete();
    handleCloseModal();
    navigate("/recettes");
  };
  return (
    <div className={styles.blur_modal}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Supprimer cette recette ?</h3>
        <div className={styles.validationMessage}>
          {validationMessage === "La recette a bien été supprimée." ? (
            <Alert
              severity={
                validationMessage === "La recette a bien été supprimée."
                  ? "success"
                  : "error"
              }
            >
              {validationMessage}
            </Alert>
          ) : null}
          <button type="button" className={styles.button} onClick={handleClick}>
            Oui
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => setShowDelete(false)}
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteRecipe.propTypes = {
  setShowDelete: PropTypes.func.isRequired,
};
