import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getAllDogs,getTemperamentsList,filterDogsByTemperament,getDogsByName,filterCreated,orderByName} from "../actions";
import DogCard from "./DogCard/DogCard";
import { Paginacion } from "./Paginacion";

import styles from "../components/Styles.module.css";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);
  const [dogState, setDogsState] = useState("");
  const [sort, setSort] = useState("");

  const maximo = allDogs.length / porPagina;

  const slice = allDogs.slice(
    (pagina - 1) * porPagina,
    (pagina - 1) * porPagina + porPagina
  );

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperamentsList());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    if (dogState.length === 0) {
      return alert("Please input a name to start the search");
    } else {
      dispatch(getDogsByName(dogState));
      setDogsState("");
    }
  }

  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }

  function handleFilteredByMade(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setPagina(1);
    setSort(`Ordenado ${e.target.value}`);
  }

  return (
    <>
      <div className={styles.navbar}>
        <h1>DOGS aPI</h1>
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
        <div>
          <input
            type="text"
            placeholder="Search a dog breed..."
            value={dogState}
            onChange={(e) => setDogsState(e.target.value)}
          />
          <button type="submit" onClick={handleClick}>
            <span>Search</span>
          </button>
        </div>
        <div>
          <Link to="/newDog/">Create Breed</Link>

          <select onChange={(e) => handleSort(e)}>
            <option value="asc">Orden by A-Z</option>
            <option value="des">Order by Z-A</option>
          </select>

          <select onChange={(e) => handleFilteredByTemp(e)}>
            <option value="all">All Temperaments</option>
            {temperaments.map((temp) => {
              return (
                <option value={temp} key={temp}>
                  {temp}
                </option>
              );
            })}
          </select>

          <select onChange={(e) => handleFilteredByMade(e)}>
            <option value="all">All Breeds</option>
            <option value="created">User Breed</option>
          </select>
          <Link to="/about/"> <button>About Me</button> </Link>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          {slice.length ? (
            slice.map((dog) => (
              <DogCard
                key={dog.id}
                id={dog.id}
                name={dog.name}
                image={dog.image}
                temperament={dog.temperament}
                temperaments={dog.temperaments}
                weight={dog.weight.metric}
                img={dog.img}
                weights={dog.height}
              />
            ))
          ) : (
            <div className={styles.Loading}>
              <h1>Loading</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
