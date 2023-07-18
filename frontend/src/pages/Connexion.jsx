import React from "react";
import styles from "./Connexion.module.css";

export default function Connexion() {
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h2>Se connecter</h2>
        <input type="text" name="mail_adress" placeholder="Adresse mail" />
        <input type="text" name="password" placeholder="Mot de passe" />
        <button type="submit">Se connecter</button>
      </div>
    </div>
  );
}
