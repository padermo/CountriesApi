const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// TODO: ------------------------------- / GET - COUNTRIES ALL / -------------------------
// Esta ruta debe obtener todos los paises de la API y guardarlos en la DB
// router.get('/countries', async (req, res) => {
//   const api = await axios.get('https://restcountries.com/v3/all');

//   const formatCountry = api.data.map(e => {
//     const obj = {
//       id: e.cca3,
//       name: e.name.common,
//       image: e.flags[0],
//       continent: e.continents[0],
//       capital: e.capital ? e.capital[0] : 'has not capital',
//       subregion: e.subregion,
//       area: e.area,
//       population: e.population,
//     }
//     return obj;
//   });

//   const db = await Country.bulkCreate(formatCountry);

//   res.status(200).send(db);
// });


// TODO: ------------------------------- / GET - COUNTRIES NAME QUERY / -------------------------
// Esta ruta debe obtener de la DB el pais segun el nombre que se envie por query (?name=)
router.get('/countries', async (req, res) => {
  // la info a consultar se envia por query, por ende tengo que validar que exista una query
  const { name } = req.query;
  try {
    if (!name) {
      const allCountries = await Country.findAll({include: [{model: Activity}]});
      res.status(200).send(allCountries);
    } else {
      const searchCountry = await Country.findOne({where:{name:name.toLowerCase()}});
      res.status(200).send(searchCountry);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
})


// TODO: ------------------------------- / GET - COUNTRIES ID / -------------------------
// Esta ruta debe obtener de la DB el pais por el id
router.get('/countries/:idPais', async (req, res) => {
  // la info llega por body
  const { idPais } = req.params;
  try {
    if (!idPais) throw new Error({message: "does not exist country"});
    const searchCountry = await Country.findByPk(idPais.toUpperCase(), {include: [{model: Activity}]});
    res.status(200).send(searchCountry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// TODO: ------------------------------- / POST - ACTIVITY / -------------------------
router.post('/activities', async (req, res) => {
  const { name, difficulty, duration, season, countryId } = req.body;
  try {
    // buscamos la actividad en caso de que exista en la DB
    let existData = await Activity.findOne({ where: { name } });

    if (!name || !difficulty || !duration || !season || !countryId) throw new Error({ message: "missing data" });
    
    // validamos la actividad
    if (!existData) {
      const createActivity = await Activity.create({ name, difficulty, duration, season });
      await createActivity.addCountries(countryId);
      // console.log(createActivity.__proto__); // en el __proto__ consultamos los metodos que nos genera sequelize tras crear las relaciones
      res.status(200).send(createActivity);
    } else {
      res.status(400).send({message: "activity already exists"})
    }
    
  } catch (error) {
    res.status(400).send(error.message);
  }
})

// TODO: ------------------------------- / GET - ACTIVITY / -------------------------
router.get('/activities', async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const activities = await Activity.findAll({ include: [{ model: Country }] });
      res.status(200).send(activities);
    } else {
      const activity = await Activity.findOne({ where: {name: name}, include: [{ model: Country }] });
      res.status(200).send(activity);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
})

// TODO: ------------------------------- / PUT - ACTIVITY / -------------------------
router.put('/activity', async (req, res) => {
  const { name } = req.query;
  const { difficulty, duration, season } = req.body;
  try {
    // comprovamos existencias en la DB
    let existsData = await Activity.findOne({ where: { name } });

    // validamos la data
    if (!existsData) {
      return res.status(404).send("No exists");
    } else {
      const updateActivity = await Activity.update({ difficulty, duration, season }, { where: { name } });
      res.status(200).send(updateActivity);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
})


module.exports = router;
