import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useUserContext } from "../contexts/UserContext";

export default function NavBar() {
  const { user, logout } = useUserContext();

  const [isActive] = useState(false);
  function closeHamb() {
    isActive(false);
  }

  return (
    <>
      <input className={styles.sideMenu} type="checkbox" id="side-menu" />
      <label className={styles.hamb} htmlFor="side-menu">
        <span className={styles.hambLine} />
      </label>
      <nav className={styles.nav}>
        <ul>
          <div className={styles.menu}>
            {user.id ? (
              <h3 className={styles.name}>Bonjour {user.name}!</h3>
            ) : null}
            <NavLink
              to="/"
              className={isActive ? styles.activeNavContent : styles.navContent}
              onClick={() => closeHamb()}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/creation"
              className={isActive ? styles.activeNavContent : styles.navContent}
              onClick={() => closeHamb()}
            >
              Ajouter une recette
            </NavLink>
            <NavLink
              to="/recettes"
              className={isActive ? styles.activeNavContent : styles.navContent}
              onClick={() => closeHamb()}
            >
              Mes recettes
            </NavLink>
            <NavLink
              to="/"
              className={isActive ? styles.activeNavContent : styles.navContent}
              onClick={() => logout()}
            >
              Se deconnecter
            </NavLink>
          </div>
        </ul>
      </nav>
    </>
  );
}
