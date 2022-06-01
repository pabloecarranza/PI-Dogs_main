import React from "react";
import { Link } from "react-router-dom";
import Styles from "../components/Styles.module.css";

function landingPage() {
  return (
    <div className={Styles.landing}>
      <div>Welcome

      <Link to="/home">
        <button>Enter</button>
      </Link>
      </div>
    </div>
  );
}

export default landingPage;
