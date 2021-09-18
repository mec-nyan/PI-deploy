const router = require('express').Router();
const { Videogame, Genre } = require('../db');


router.get('/:id', async function(req, res) {
  // GET /videogame/{idVideogame}:
  // Obtener el detalle de un videojuego en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de videojuego
  // Incluir los géneros asociados
  let { id } = req.params;
  console.log(id);
  console.log(typeof id);
  let game = await Videogame.findByPk(id, { include: Genre });

  res.json({ route: 'videogames', params: {id}, game, });
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
