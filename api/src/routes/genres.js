const router = require('express').Router();
const loadGenres = require('../loadgenres');
const { Genre } = require('../db');


router.get('/', async function(req, res) {
  /* Obtener todos los tipos de géneros de videojuegos posibles */
  // >> Populate the table only the first time
  // >> (see loadgenres.js)
  await loadGenres();
  // >> Get the list of genres
  let genres = await Genre.findAll({ attributes: ['name'] });
  res.json({ genres: genres.map( g => g.name) });
});

module.exports = router;
