const router = require('express').Router();
const loadGenres = require('../loadgenres');
const { Platform } = require('../db');


router.get('/', async function(req, res) {
  /* Obtener todos los tipos de plataformas de videojuegos posibles */
  let platforms = await Platform.findAll({ attributes: ['name'] });
  res.json({ platforms: platforms.map( p => p.name) });
});

module.exports = router;
