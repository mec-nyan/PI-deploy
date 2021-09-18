const router = require('express').Router();
const Videogame = require('../models/Videogame');
const Genre = require('../models/Genre');


router.post('/', async function(req, res) {
  // POST /videogame:
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  // Crea un videojuego en la base de datos
});
