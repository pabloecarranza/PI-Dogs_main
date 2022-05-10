import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDetail, resetDetail } from "../actions";
import { useEffect } from "react";
import styles from "../components/Styles.module.css";
import { useHistory } from "react-router-dom";

function DogDetail(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    return () => {
      dispatch(resetDetail());
    };
  }, []);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  let history = useHistory();
  const handleClickss = () => {
    history.push("/home/");
  };
  console.log(detail);

  return (
    <>
      {detail.length ? (
        detail.find((dog) => dog.created === true) ? (
          <div className={styles.dogDetail}>
            <h1>{detail[0].name}</h1>
            <img src={detail[0].img} alt="" />
            <h2>height Max{detail[0].height.max}</h2>
            <h2>height Min{detail[0].height.min}</h2>
            <h2>Espectativa de vida {detail[0].life_span}</h2>
            <h2>Temperamentos</h2>
            <div>
              {detail[0].temperaments.map((temper) => {
                return <h2>{temper.name}</h2>;
              })}
            </div>
            <button onClick={handleClickss}>Pagina Principal</button>
          </div>
        ) : (
          <div className={styles.dogDetail}>
            <h1>{detail[0].name}</h1>
            <img src={detail[0].image} alt="" />
            <h2>Origen: {detail[0].origin}</h2>
            <h2>Altura {detail[0].weight.imperial} cm</h2>
            <h2>Temperamentos {detail[0].Temperament}</h2>
            <button onClick={handleClickss}>Pagina Principal</button>
          </div>
        )
      ) : (
        <div className={styles.loading}>
          <h1>Loading</h1>
        </div>
      )}
    </>
  );
}

export default DogDetail;

