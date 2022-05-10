import React from "react";
import { Link } from "react-router-dom";
import Styles from "../components/Styles.module.css";

function landingPage() {
  return (
    <div className={Styles.landing}>
      <div>Bienvenido

      <Link to="/home">
        <button>Entrar</button>
      </Link>
      </div>
    </div>
  );
}

export default landingPage;
