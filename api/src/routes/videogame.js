const router = require('express').Router();
const { Videogame, Genre } = require('../db');
const load = require('../loadgame');  // >> this will load games in our local database

const process = require('process');
const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const url = 'https://api.rawg.io/api/games';


router.get('/:id', async function(req, res) {
  let { id } = req.params;
  try {
    let game = await axios.get(`${url}/${id}?key=${KEY}`);
    game = game.data;
    if (game.name) {
      let detail = {
        id,
        name: game.name,
        description: game.description,
        released: game.released,
        image: game.background_image,
        rating: game.rating,
        platforms: game.platforms.map( p => p.platform.name ),
        genres: game.genres.map( g => g.name ),
      };
      return res.status(200).json(detail);
    } else {
      return res.status(404).json({detail: 'Not found'});
    }
  } catch (err) {
    return res.status(404).json({msg: 'Oops! Something went wrong...'});
  }
});
/*
router.get('/:_id', async function(req, res) {
  // GET /videogame/{idVideogame}:
  // Obtener el detalle de un videojuego en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de videojuego
  // Incluir los géneros asociados
  let { _id } = req.params;
  _id = parseInt(_id);
  let { local } = req.query;
  let game;

  try {
    if (local) {
       game = await Videogame.findByPk(_id, { include: Genre });
    } else {
      // >> check that the game hasn't been already stored
      game = await Videogame.findOne({ where: { rawgId: _id }, include: Genre });
      if (!game) {
        await load(_id);
        game = await Videogame.findOne({ where: { rawgId: _id }, include: Genre });
      }
    }
  } catch (err) {
    res.status(404).json(err);
  }

  if (game) { // >> game will be null if findByPk fails
    let { id, name, released, rating, genres } = game;
    genres = genres.map( g => ({ id: g.id, name: g.name, slug: g.slug }));
    return res.json({ route: 'videogames', params: {id}, details: { id, name, released, rating, genres } });
  } else {
    return res.status(404).json({msg: 'shit happens bro'});
  }
});
*/

router.post('/', async function(req, res) {
  // POST /videogame:
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  // Crea un videojuego en la base de datos
  res.status(200).json({route: 'this is the videogame route'});
});

module.exports = router;
