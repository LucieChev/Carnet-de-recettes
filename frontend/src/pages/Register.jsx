import React, { useState } from "react";
import Joi from "joi";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import instance from "../services/APIService";
import styles from "./Register.module.css";

export default function Register() {
  const schema = Joi.object({
    name: Joi.string().min(3).max(80).messages({
      "string.min":
        "Votre nom doit avoir une longueur minimale de 3 caractères.",
      "string.max":
        "Votre nom doit avoir une longueur maximale de 80 caractères.",
    }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "fr"] },
      })
      .messages({
        "string.email": "Vous devez entrez une adresse mail valide.",
      }),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .messages({
        "string.pattern.base":
          "Votre mot de passe doit être constitué uniquement de caractères alphanumériques et doit être d'une taille de 3 à 30 caractères.",
      }),
  });
  const [validationMessage, setValidationMessage] = useState(null);
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { error } = schema.validate(formInfo);

    if (error) {
      setValidationMessage(error.message);
    } else {
      setValidationMessage(null);
    }

    instance
      .post("/user/register", formInfo)
      .then((response) => {
        if (response.status === 201) {
          setValidationMessage(
            "Compte créé. Vous pouvez désormais vous connecter."
          );
        }
      })
      .catch((err) => {
        if (err.response.status === 400)
          setValidationMessage("Veuillez utiliser une autre adresse mail");
      });
  };
  if (!formInfo) return null;
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputName}>
            <input
              type="text"
              name="name"
              placeholder="Nom d'utilisateur"
              value={formInfo.name}
              onChange={handleChange}
              required
            />{" "}
          </div>

          <div className={styles.inputEmail}>
            <input
              type="email"
              name="email"
              placeholder="Adresse mail"
              value={formInfo.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputPassword}>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formInfo.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.buttons}>
            {validationMessage ===
            "Veuillez utiliser une autre adresse mail" ? (
              <Alert
                className={styles.validationMessage}
                severity={
                  validationMessage ===
                  "Veuillez utiliser une autre adresse mail"
                    ? "error"
                    : "success"
                }
              >
                {validationMessage}
              </Alert>
            ) : null}
            {validationMessage !==
            "Compte créé. Vous pouvez désormais vous connecter." ? (
              <button type="submit">S'inscrire</button>
            ) : null}
            {validationMessage ===
            "Compte créé. Vous pouvez désormais vous connecter." ? (
              <Alert
                className={styles.validationMessage}
                severity={
                  validationMessage ===
                  "Compte créé. Vous pouvez désormais vous connecter."
                    ? "success"
                    : "error"
                }
              >
                {validationMessage}
              </Alert>
            ) : null}
            {validationMessage ===
            "Compte créé. Vous pouvez désormais vous connecter." ? (
              <Link to="/connexion">
                <button type="button">Se connecter</button>
              </Link>
            ) : null}
          </div>
          <div>
            <p>Déja inscrit ?</p>
            <Link to="/connexion"> Cliquez ici</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
