import { Link } from "react-router-dom";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import styles from "./Home.module.css";
import { useUserContext } from "../contexts/UserContext";

export default function Home() {
  const { user } = useUserContext();

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>Créez votre carnet de recettes</h1>
        {user.id ? (
          <Link to="/creation">
            <h2>Commencez</h2>
            <BsFillArrowRightSquareFill />
          </Link>
        ) : (
          <Link to="/inscription">
            <h2>Commencez</h2>
            <BsFillArrowRightSquareFill />
          </Link>
        )}
      </div>
      <div className={styles.links}>
        <Link to="/connexion">
          <h3>Se connecter</h3>
        </Link>
        <Link to="/inscription">
          <h3>S'inscrire</h3>
        </Link>
      </div>
    </div>
  );
}
