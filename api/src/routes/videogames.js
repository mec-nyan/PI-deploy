const router = require('express').Router();
const { Op } = require('sequelize');
const { Videogame, Genre, Platform } = require('../db');

const process = require('process');
const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const url = ' https://api.rawg.io/api/games';




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
      genres = genres.map( g => ({ id: g.id, name: g.name }));
      output.push({ id, name, slug, genres });
    });
    return res.json({ output });
  }
});

module.exports = router;
