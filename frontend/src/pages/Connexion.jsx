/* import React, { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Connexion.module.css";
import instance from "../services/APIService";
import { useUserContext } from "../contexts/UserContext";

export default function Connexion() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
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
            name="email"
            placeholder="Adresse mail"
            value={loginInfo.email}
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
 */

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import styles from "./Connexion.module.css";
import instance from "../services/APIService";

export default function Login() {
  const { login } = useUserContext();
  const navigate = useNavigate();

  // Formik Logic
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    /*     validationSchema: loginSchema,
     */
    onSubmit: async (values) => {
      try {
        const res = await instance.post(`/user/login`, values);
        if (res) {
          login(res.data);
          navigate("/");
        } else throw new Error();
      } catch (error) {
        if (error.request.status === 401) {
          console.error(error);
        }
      }
    },
  });
  return (
    <main className={styles.page}>
      <form
        action="login"
        onSubmit={formik.handleSubmit}
        className={styles.formWrapper}
      >
        <h3 className={styles.formTitle}>Connectez-vous.</h3>
        <div className={styles.inputBox}>
          <label htmlFor="email" className={styles.label}>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : "Email"}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="adresse@mail.com"
            required=""
            value={formik.values.email}
            onChange={formik.handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="password" className={styles.label}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : "Mot de passe"}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required=""
            value={formik.values.password}
            onChange={formik.handleChange}
            className={styles.input}
          />
        </div>
        <button
          type="submit"
          onSubmit={formik.handleSubmit}
          className={styles.btn}
        >
          Connexion
        </button>
      </form>
    </main>
  );
}
