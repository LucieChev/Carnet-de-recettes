import React from "react";
import styles from "./Register.module.css";

export default function Register() {
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h2>S'inscrire</h2>
        <input type="text" name="mail_adress" placeholder="Adresse mail" />
        <input type="text" name="name" placeholder="Nom d'utilisateur" />
        <input type="text" name="password" placeholder="Mot de passe" />
        <button type="submit">S'inscrire</button>
      </div>
    </div>
  );
}
