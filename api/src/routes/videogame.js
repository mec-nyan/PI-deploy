const router = require('express').Router();
const Videogame = require('../models/videogame');
const Genre = require('../models/genre');


router.post('/', async function(req, res) {
  // POST /videogame:
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  // Crea un videojuego en la base de datos
  res.status(200).json({route: 'this is the videogame route'});
});

module.exports = router;
