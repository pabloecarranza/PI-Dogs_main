import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Tempers from "./Tempers";
import { useSelector } from "react-redux";
import styles from './dogDetail.module.css'
import axios from "axios";

import {
  postDog as postBreed,
  getTemperamentsList as getTemperaments,
} from "../actions/index";

function validate(breed) {
  let errors = {};
  const regexName = /^([a-zA-Z ]+)$/i;
  const regexImg = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

  if (!breed.name) {
    errors.name = "El campo nombre no puede estar vacio";
  } else if (!breed.height.min || !breed.height.max) {
    errors.height = "The field 'Height' must be completely filled in";
  } else if (!breed.weight.min || !breed.weight.max) {
    errors.weight = "The field 'Weight' must be completely filled in";
  } else if (!breed.temperament || breed.temperament.length < 2) {
    errors.temperament = "Please, select at least two";
  }

  if (breed.name && !regexName.test(breed.name)) {
    errors.name = "El nombre no puede incluir caracteres especiales o numero";
  }
  if (breed.img && !regexImg.test(breed.img)) {
    errors.img = "Please, verify the URL";
  }
  if (breed.weight && breed.weight.min > breed.weight.max) {
    errors.weight = "Please, verify your input";
  }
  if (breed.height && breed.height.min > breed.height.max) {
    errors.height = "Please, verify your input";
  }
  return errors;
}

export default function AddBreed() {
  const dispatch = useDispatch();
  const allTempers = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [temperSelect, setTemperSelect] = useState({
    temperaments: JSON.parse(JSON.stringify([...allTempers])),
  });

  let history = useHistory();
  const handleClickss = () => {
    history.push("/home/");
  };

  const [newBreed, setNewBreed] = useState({
    name: "",
    height: {
      min: 0,
      max: 0,
    },
    weight: {
      min: 0,
      max: 0,
    },
    life_span: "",
    img: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setNewBreed({
      ...newBreed,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...newBreed,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleWeightChange(e) {
    e.preventDefault();
    setNewBreed({
      ...newBreed,
      weight: {
        ...newBreed.weight,
        [e.target.name]: parseInt(e.target.value),
      },
    });
    setErrors(
      validate({
        ...newBreed,
        weight: {
          ...newBreed.weight,
          [e.target.name]: parseInt(e.target.value),
        },
      })
    );
  }

  function handleHeightChange(e) {
    e.preventDefault();
    setNewBreed({
      ...newBreed,
      height: {
        ...newBreed.height,
        [e.target.name]: parseInt(e.target.value),
      },
    });
    setErrors(
      validate({
        ...newBreed,
        height: {
          ...newBreed.height,
          [e.target.name]: parseInt(e.target.value),
        },
      })
    );
  }

  function handleTempersChange(e) {
    e.preventDefault();
    setNewBreed({
      ...newBreed,
      temperament: [...newBreed.temperament, e.target.value],
    });
    setTemperSelect({
      temperaments: temperSelect.temperaments.filter(
        (t) => t.id !== parseInt(e.target.value)
      ),
    });
    setErrors(
      validate({
        ...newBreed,
        temperament: [...newBreed.temperament, e.target.value],
      })
    );
  }
  function handleClick(e) {
    e.preventDefault();
    setNewBreed({
      ...newBreed,
      temperament: newBreed.temperament.filter((t) => t !== e.target.value),
    });
    const newList = allTempers.filter(
      (e) => !newBreed.temperament.includes(e.id)
    );
    setTemperSelect({
      ...temperSelect,
      temperaments: newList,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      newBreed.name &&
      newBreed.weight.min &&
      newBreed.weight.max &&
      newBreed.temperament.length > 1
    ) {
      dispatch(postBreed(newBreed));
      setNewBreed({
        name: "",
        height: {
          min: 0,
          max: 0,
        },
        weight: {
          min: 0,
          max: 0,
        },
        life_span: "",
        img: "",
        temperament: [],
      });
      setTemperSelect({
        temperaments: JSON.parse(JSON.stringify([...allTempers])),
      });
      alert("Breed created");
    } else {
      alert("All Necessary fields must be filled");
    }
  }

  function fileChange() {
    let photos = document.getElementById("input_img");
    Array.from(photos.files).map(async (photo) => {
      const body = new FormData();
      body.set("key", "1c3d8211cd35f7ac981f86ad33d811c6");
      body.append("image", photo);

      const options = {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            setNewBreed({
              ...newBreed,
              img: `loading ${percent} %`,
            });
          }
        },
      };

      await axios
        .post("https://api.imgbb.com/1/upload", body, options)
        .then((response) => {
          setNewBreed({
            ...newBreed,
            img: response.data.data.url,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  return (
    <div className={styles.carDetail}>
      <h1 className="addTitle">Create a new Breed</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={newBreed.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Height (cm): </label>
          <div className="MinMax">
            <label>Min: </label>
            <input
              type="number"
              value={newBreed.height.min}
              name="min"
              onChange={handleHeightChange}
              min={0}
              step={5}
            />
            <label>Max: </label>
            <input
              type="number"
              value={newBreed.height.max}
              name="max"
              onChange={handleHeightChange}
              min={0}
              step={5}
            />
          </div>
          {errors.height && <p className="error">{errors.height}</p>}
        </div>
        <div>
          <label>Weight (kg): </label>
          <div className="MinMax">
            <label>Min: </label>
            <input
              type="number"
              value={newBreed.weight.min}
              name="min"
              onChange={handleWeightChange}
              min={0}
              step={5}
            />
            <label>Max: </label>
            <input
              type="number"
              value={newBreed.weight.max}
              name="max"
              onChange={handleWeightChange}
              min={0}
              step={5}
            />
          </div>
          {errors.weight && <p className="error">{errors.weight}</p>}
        </div>
        <div>
          <label>Life span: </label>
          <span>
            <input
              type="text"
              value={newBreed.life_span}
              name="life_span"
              onChange={handleChange}
              placeholder="Example: 5 - 6 years"
            />
          </span>
          {errors.life_span && <p className="error">{errors.life_span}</p>}
        </div>
        <div>
          <Tempers
            handleTempersChange={handleTempersChange}
            temperament={newBreed.temperament}
            allTempers={allTempers}
            temperSelect={temperSelect}
            handleClick={handleClick}
          />
          {errors.temperament && <p className="error">{errors.temperament}</p>}
        </div>
        <div>
          <label>Image: </label>
          <input
            type="text"
            value={newBreed.img}
            name="img"
            onChange={handleChange}
            placeholder="Paste an URL or choose from your files"
          />
          <input
            autoComplete="off"
            placeholder=" "
            type="file"
            accept="image/*"
            name="logoImage"
            id="input_img"
            onChange={fileChange}
          />

          {errors.img && <p className="error">{errors.img}</p>}
        </div>
        <input type="submit" />
      </form>
      <div>
        <button onClick={handleClickss}>Pagina Principal</button>
      </div>
    </div>
  );
}
