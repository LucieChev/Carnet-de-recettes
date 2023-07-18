import React from "react";
import { Link } from "react-router-dom";
import styles from "./CreateRecipe.module.css";

export default function CreateRecipe() {
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>Mes recettes</h1>
      </div>
      <div className={styles.links}>
        <Link to="/connexion">
          <h3>Se connecter</h3>
        </Link>
        <Link to="/register">
          <h3>S'inscrire</h3>
        </Link>
      </div>
    </div>
  );
}
