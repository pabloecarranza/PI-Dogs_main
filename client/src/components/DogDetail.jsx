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
            <img src={detail[0].image} alt="" />
            <h2>Life Span {detail[0].life_span}</h2>
            <h2>Temperaments</h2>
            <h2>{detail[0].temperament}</h2>
            <h2>weight</h2>
            <h2>Min{detail[0].weight.min}</h2>
            <h2> Max{detail[0].weight.max}</h2>
            <button onClick={handleClickss}>Home Page</button>
          </div>
        ) : (
          <div className={styles.dogDetail}>
            <h1>{detail[0].name}</h1>
            <img src={detail[0].image} alt="" />
            <h2>Origin: {detail[0].origin}</h2>
            <h2>Temperaments</h2>
            <h2>{detail[0].temperament}</h2>
            <h2>weights</h2>
            <h2>{detail[0].weight.imperial} cm</h2>
            <button onClick={handleClickss}>Home Page</button>
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

