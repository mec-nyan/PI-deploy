const router = require('express').Router();
const { Videogame, Genre, Platform } = require('../db');

const process = require('process');
const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const url = ' https://api.rawg.io/api/games';


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
        // >> Call the api
        const gameData = await axios.get(`${url}/${_id}?key=${KEY}`);
        // >> How's it going?
        console.log(gameData.data?.name || "<< Not found >>");
        // >> Get the needed information
        let { id, name, description, released, rating, genres, platforms } = gameData.data;
        // >> Create the game entry on the table
        game = await Videogame.create({
          // >> The ids on my table aren't the same as in the rawg api
          rawgId: id, name, released, rating, description 
        });
        // >> Get list of genres
        let genreData = genres.map( g => ({ id: g.id, name: g.name }));
        for (let gd of genreData) {
          let [ genre, created ] = await Genre.findOrCreate({
            where: {
              id: gd.id,
              name: gd.name,
            }
          });
          await game.addGenre(genre);
        }
        console.log('[[(( generos agregados ))]]');
        // >> Get list of platforms
        let platformData = platforms.map( p => ({ id: p.platform.id, name: p.platform.name }));
        for (let pd of platformData) {
          let [ platform, created ] = await Platform.findOrCreate({
            where: {
              id: pd.id,
              name: pd.name,
            }
          });
          await game.addPlatform(platform);
        }
        game = await Videogame.findOne({ where: { rawgId: _id }, include: Genre });
      }
    }
  } catch (err) {
    res.status(404).json(err);
  }

  if (game) { // >> game will be null if findByPk fails
    let { id, name, released, rating, genres } = game;
    genres = genres.map( g => ({ id: g.id, name: g.name }));
    return res.json({ route: 'videogames', params: {id}, details: { id, name, released, rating, genres } });
  } else {
    return res.status(404).json({msg: 'shit happens bro'});
  }
});


router.get('/', async function(req, res) {
  // GET /videogames?name="...":
  // Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  // Si no existe ningún videojuego mostrar un mensaje adecuado
  let { name } = req.query;
  if (name) {
    //
  } else {
  // GET /videogames:
  // Obtener un listado de los videojuegos
  // Debe devolver solo los datos necesarios para la ruta principal
  }
  res.json({route: 'videogames'});
});

module.exports = router;
