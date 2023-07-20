import React, { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Connexion.module.css";
import instance from "../services/APIService";
import { useUserContext } from "../contexts/UserContext";

export default function Connexion() {
  const [loginInfo, setLoginInfo] = useState({
    mail_address: "",
    password: "",
  });
  const [validationMessage, setValidationMessage] = useState(null);

  // TODO Faire context pour utilisateur et token
  const { login } = useUserContext();
  const navigate = useNavigate();

  // Met à jour le state loginInfo à chaque fois qu'un des champs du formulaire est changé.
  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    instance
      .post(`user/login`, loginInfo)
      .then((response) => {
        login(response.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 401)
          setValidationMessage(
            "Les informations renseignées sont incorrectes."
          );
        else setValidationMessage("Merci d'essayer plus tard.");
      });
  };
  if (!loginInfo) return null;
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h2>Se connecter</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="mail_address"
            placeholder="Adresse mail"
            value={loginInfo.mail_address}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={loginInfo.password}
            onChange={handleChange}
            required
          />
          <div className={styles.buttons}>
            {validationMessage ? (
              <Alert className={styles.validationMessage} severity="warning">
                {validationMessage}
              </Alert>
            ) : null}
            <button type="submit">Se connecter</button>
          </div>
        </form>
      </div>
    </div>
  );
}
