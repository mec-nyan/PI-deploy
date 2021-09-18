const router = require('express').Router();


router.get('/', async function(req, res) {
  /* Obtener todos los tipos de géneros de videojuegos posibles */
  res.status(303).json({route: 'genres'});
});

module.exports = router;
