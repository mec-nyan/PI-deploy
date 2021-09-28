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
  let out = [];
  let local = [];
  if (name) {
    //>> find local and external games
    try {
      games = await Videogame.findAll({
        attributes: ['id', 'name', 'rating'], 
        include: Genre,
        where: {
          name: {
            [Op.substring]: `%${name}%`,
          },
        },
        limit: 15,
      });
      games.forEach( g => {
        let { id, name, rating, genres } = g;
        genres = genres.map( g => g.name);
        local.push({ id, name, rating, genres, image: null });
      });
    } catch (err) {
      console.log('/videogames?name=... error finding local games');
    }
    //
    try {
      games = await axios.get(`${url}?search=${name}&key=${KEY}`);
      out = games.data.results.map(function(g) {
        return {
          id: g.id,
          name: g.name,
          rating: g.rating,
          genres: g.genres.map( genre => genre.name ),
          image: g.background_image,
        };
      });

    } catch (err) {
      console.log('Oops! axios error in "videogames?name=..."');
    }
  } else {
    //>> local first
    try {
      games = await Videogame.findAll({
        attributes: ['id', 'name', 'description', 'rating'], 
        include: Genre });
      games.forEach( g => {
        let { id, name, description, rating, genres } = g;
        genres = genres.map( g => g.name);
        local.push({ id, name, description, rating, genres });
      });
    } catch (err) {
      console.log('/videogames?name=... error finding ALL local games');
    }
    // END
    let id = 1;
    let count = 0;
    let game;
    while (count < 100) {
      try {
        game = await axios.get(`${url}/${id}?key=${KEY}`);
        game = game.data;
        if (game.name) {
          let detail = {
            id,
            name: game.name,
            rating: game.rating,
            image: game.background_image,
            genres: game.genres.map( g => g.name ),
          };
          out.push(detail);
          ++count;
        }
      } catch (err) {
        console.log(`Oops! axios error in "videogames" [id: ${id}]`);
      }
      ++id;
    }
  }

  out = [ ...local, ...out ];
  console.log('NUMBER OF GAMES: ', out.length);
  if (out.length > 0) {
    return res.status(200).json(out);
  } else {
    return res.status(404).json({msg: 'Not found'});
  }
});

module.exports = router;
