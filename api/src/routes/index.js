const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use('/videogame', videogame);
//router.use('/videogames', videogames);
//router.use('/genres', genres);
router.get('/', (req, res) => res.json({index: "this is /"}));


//module.exports = router;
module.exports = {
  videogame: require('./videogame'),
  videogames: require('./videogames'),
  genres: require('./genres'),
  localgames: require('./localgames'),
  index: router,
};
