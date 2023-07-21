import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useUserContext } from "../contexts/UserContext";
import styles from "./Connexion.module.css";
import instance from "../services/APIService";

export default function Login() {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await instance.post(`/user/login`, values);
        if (res) {
          login(res.data);
          navigate("/");
        } else throw new Error();
      } catch (error) {
        if (error.response?.status === 401)
          setValidationMessage(
            "Les informations renseignées sont incorrectes."
          );
        else setValidationMessage("Merci d'essayer plus tard.");
      }
    },
  });
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h2>Se connecter</h2>
        <form action="login" onSubmit={formik.handleSubmit}>
          <div className={styles.inputEmail}>
            <input
              type="email"
              name="email"
              placeholder="Adresse mail"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputPassword}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.buttons}>
            {validationMessage ? (
              <Alert className={styles.validationMessage} severity="warning">
                {validationMessage}
              </Alert>
            ) : null}
            <button type="submit">Se connecter</button>
            <div>
              <p>Pas encore inscrit ?</p>
              <Link to="/inscription"> Cliquez ici</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
