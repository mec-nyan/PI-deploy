const router = require('express').Router();
const { Op } = require('sequelize');
const { Videogame, Genre, Platform } = require('../db');

const process = require('process');
const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const url = 'https://api.rawg.io/api/games';



/* >> No hay que usar la db local???
router.get('/', async function(req, res) {
  // GET /videogames?name="...":
  // Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  // Si no existe ningún videojuego mostrar un mensaje adecuado
  let { name } = req.query;
  if (name) {
    let games = await Videogame.findAll({
      where: {
        slug: {
          [Op.substring]: `%${name}%`,
        },
      },
      limit: 10,
    });

    let names = games.map( g => g.slug );
    return res.json({matches: names});
  } else {
    // GET /videogames:
    // Obtener un listado de los videojuegos
    // Debe devolver solo los datos necesarios para la ruta principal
    let games = await Videogame.findAll({ attributes: ['id', 'name'], include: Genre });
    let output = [];
    games.forEach( g => {
      let { id, name, slug, genres } = g;
      genres = genres.map( g => ({ id: g.id, name: g.name, slug: g.slug }));
      output.push({ id, name, slug, genres });
    });
    return res.json({ output });
  }
});
*/ 

router.get('/', async function(req, res) {
  // filter by name 
  let { name } = req.query;
  let games;
  if (name) {
    games = await axios.get(`${url}?search=${name}&key=${KEY}`);
  } else {
    games = await axios.get(`${url}?key=${KEY}`);
  }
  let out = games.data.results.map(function(g) {
    return {
      name: g.name,
      rating: g.rating,
      genres: g.genres.map( genre => genre.name ),
      image: g.background_image,
    };
  });

  console.log(out.length);
  if (games.data) {
    return res.status(200).json(out);
  } else {
    return res.status(404).json({msg: 'Not found'});
  }
});

module.exports = router;
