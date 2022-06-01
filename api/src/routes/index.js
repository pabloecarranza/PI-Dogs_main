const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const router = Router();

const getInfoAPI = async () => {
  const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiDogs = await apiURL.data.map((dog) => {
    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      temperament: dog.temperament,
      weight: dog.weight,
      origin: dog.origin,
      temperamentCC: dog.temperament,
    };
  });

  return apiDogs;
};

const datainDB = async () => {
  let DogDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const tempDB = DogDB.map((dog) => {
    return {
      id: dog.id,
      image: dog.img,
      name: dog.name,
      temperament: dog.temperaments.map((temper)=> temper.name).join(', '),
      life_span: dog.life_span,
      weight: dog.weight,
      origin: dog.origin,
      temperamentCC: dog.temperament,
      created:true
    };
  });

  return tempDB
};

const getAllDogs = async () => {
  const apiInfo = await getInfoAPI();
  const dataInfo = await datainDB();
  const infoTotal = apiInfo.concat(dataInfo);
  return infoTotal;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  try {
    let dogsTotal = await getAllDogs();
    if (name) {
      let dogName = await dogsTotal.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res
            .status(404)
            .send("Cann't find the dog with the name you are looking for");
    } else {
      res.status(200).json(dogsTotal);
    }
  } catch (error) {
    res.status(404).json("There is no dog's with this name");
  }
});

router.get("/temperament", async (req, res) => {
  const allData = await axios.get("https://api.thedogapi.com/v1/breeds");
  try {
    let everyTemperament = allData.data
      .map((dog) => (dog.temperament ? dog.temperament : "No info"))
      .map((dog) => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach((el) => {
      if (el) {
        Temperament.findOrCreate({
          where: { name: el },
        });
      }
    });
    eachTemperament = await Temperament.findAll();
    res.status(200).json(eachTemperament);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get(
  "/dog/",
  /* http://localhost:3001/dog/?temperament=active */ async (req, res) => {
    const temperament = req.query.temperament;
    const everyDog = await getAllDogs();

    const dogSearchResult = everyDog.filter((dog) => {
      if (temperament === "all") return everyDog;
      else if (dog.temperament) {
        return dog.temperament
          .toLowerCase()
          .includes(temperament.toLowerCase());
      }
    });

    res.status(200).json(dogSearchResult);
  }
);

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogSelect = await dogsTotal.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    dogSelect.length
      ? res.status(200).send(dogSelect)
      : res.status(404).send("la raza no existe");
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.post("/dog", async (req, res) => {
  let {
    name,
    height,
    weight,
    years,
    origin,
    image,
    bred_for,
    breed_group,
    life_span,
    temperament,
    madeByDB,
  } = req.body;
  let dogCreated = await Dog.create({
    name,
    height,
    weight,
    years,
    origin,
    image,
    bred_for,
    breed_group,
    life_span,
    madeByDB,
  });

  let temperamentDB = await Temperament.findAll({
    where: { name: temperament },
  });

  dogCreated.addTemperament(temperamentDB);
  res.send("Personaje creado con exito");
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const allDogs = await getAllDogs();
  if (id) {
    let dogId = await allDogs.filter((dog) => dog.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("dog dont exists");
  }
});

module.exports = router;
