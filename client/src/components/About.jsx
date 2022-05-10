import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../components/Styles.module.css";

function About() {
  let history = useHistory();
  const handleClickss = () => {
    history.push("/home/");
  };

  return (
    <div className={styles.about}>

      <h1>JavaScript Full Stack Developer💻 .! </h1>
      <span>
        💡Algunas de mis habilidades son: JavaScript, React Js, React Native,
        Redux, Express.js, Node, MongoDB, Firebase, Sequelize, PostgreSQL, HTML,
        CSS, entre otras. Me encanta el cambio, adaptarme a los diferentes
        retos, trabajar en equipo y estar en #ModoEstudianteSiempre📖 <br></br><br></br>Si
        necesitas mas informacion puedes encontrarme por lo siguientes medios:<br></br>
        Email: pabloecarranza@gmail.com <br></br>GitHub:
        https://github.com/pabloecarranza
      </span>
      <button onClick={handleClickss}>Pagina Principal</button>
    </div>
  );
}

export default About;
