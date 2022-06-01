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
      Soy Programador FullStack 💻 !<br /> instruido por Bootcamp Soy Henry.
          👩🏼‍💻
          <br />
          Súper intensivo, con más de 800 hs de práctica de código.👩🏼‍🎓
          <br /> <br />
          Aquí aprendí HARD SKILLS como: <br />
          Frontend: React, Redux, 👩🏼‍🏫 <br />
          Backend: Node.JS, Javascript, Express, Sequelize👩🏼‍🏫 <br />
          Data Base: SQLite, PostgreSQL, SQL 👩🏼‍🏫
          <br />
          <br />
          Me encuentro aprendiendo en este momento Typescript && React Native.🕵🏼‍♀️
          <br />
          #StudentModeAlways 📖
          <br />
          <br />
          También tuve el privilegio de fortalecer y/o aprender Soft Skills:{" "}
          <br />
          🔹 Comunicación clara 💬
          <br /> 🔹Trabajo en equipo 🤝
          <br />
          🔹Adaptación al cambio 🌪️ <br />
          🔹Resolución de problemas 🛠️
          <br /> <br />
          Quieres conocerme mejor? <br />
          Te dejo mi contacto: <br />
          Mail: 📬pabloecarranza@gmail.com
          <br />
          Github: 🐱 https://github.com/pabloecarranza
      </span>
          <br />
      <button onClick={handleClickss}>Home Page</button>
    </div>
  );
}

export default About;
