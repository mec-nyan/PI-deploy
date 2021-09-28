const router = require('express').Router();
const loadGenres = require('../loadgenres');
const { Genre } = require('../db');


router.get('/', async function(req, res) {
  /* Obtener todos los tipos de géneros de videojuegos posibles */
  // >> Populate the table only the first time
  // >> (see loadgenres.js)
  // >> Get the list of genres
  let genres = [];

  try {
    genres = await Genre.findAll({ attributes: ['name'] });
  } catch (err) {
    console.log("Can't find genres");
  }

  if (genres.length === 0) {
    await loadGenres();
    try {
      genres = await Genre.findAll({ attributes: ['name'] });
    } catch (err) {
      console.log("Can't find genres");
    }
  }

  res.json({ genres: genres.map( g => g.name) });
});

module.exports = router;
