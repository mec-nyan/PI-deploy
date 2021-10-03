const router = require('express').Router();
const { Videogame, Genre, Platform } = require('../db');
const load = require('../loadgame');  // >> this will load games in our local database

const process = require('process');
const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const url = 'https://api.rawg.io/api/games';


router.get('/:id', async function(req, res) {
  let { id } = req.params;
  let game;
  if (id.length < 8) {
    try {
      game = await axios.get(`${url}/${id}?key=${KEY}`);
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
  } else {
    try {
      game = await Videogame.findByPk(id, { include: [ Genre, Platform ] });
    } catch (err) {
      ;
    }
    if (game) {
      //console.log(game);
      //return;
      let {name, description, released, rating, image, genres, platforms } = game;
      return res.status(200).json({
        name,
        description,
        released,
        rating,
        image,
        genres: genres.map(g => g.name),
        platforms: platforms.map(p => p.name),
      });
    }
  }
  return res.status(404).json({msg: 'not found'});
});


router.post('/', async function(req, res) {
  // POST /videogame:
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  // Crea un videojuego en la base de datos
  let { name, rating, image, description, released, genres, platforms } = req.body;
  let game;
  try {
    game = await Videogame.create({
      name,
      description,
      released,
      rating,
      image,
    });

    await bindGenre(game, genres);

    await bindPlatform(game, platforms);

  } catch (err) {
    //console.log('Oops! Error in "POST": Failed to create game.');
    //console.log('====================================================');
    //console.log(err);
    //console.log('====================================================');
    return res.status(407).send('Couldn\'t create game');
  }

  let out = {
    id: game.id,
    name, 
    rating,
    genres,
    image,
  };

  return res.status(200).json(out);
});


//>> Helper functions

async function bindGenre(game, genres) {
  // >> Get list of genres
  for (let gd of genres) {
    let [ genre, created ] = await Genre.findOrCreate({
      where: {
        name: gd,
        slug: gd.toLowerCase(),
      }
    });
    await game.addGenre(genre); // Is 'await' necesary?
    console.log(`\tGenre [ ${genre.name} ] has been linked to "${game.name}`);
  }
}

async function bindPlatform(game, platforms) {
  // >> Get list of platforms
  for (let pd of platforms) {
    let [ platform, created ] = await Platform.findOrCreate({
      where: {
        name: pd,
        slug: pd.toLowerCase(),
      }
    });
    await game.addPlatform(platform); // Is 'await' necesary?
    console.log(`\tPlatform [ ${platform.name} ] has been linked to "${game.name}`);
  }
}

module.exports = router;
