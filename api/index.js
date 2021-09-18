//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}).then(async function() { // >> I added this '.then()'
  // >> Just for testing, I'm adding some games here.
  const process = require('process');
  const axios = require('axios');
  require('dotenv').config();
  const { KEY } = process.env;
  const url = ' https://api.rawg.io/api/games';
  const { Videogame, Genre, Platform } = require('./src/db');
  const MAX_GAMES = 10;

  let count = 0; 
  let i = 1;
  while (count < MAX_GAMES) {
    try {
      // >> fetch the data
      const gameData = await axios.get(`${url}/${i}?key=${KEY}`);
      // >> How's it going?
      console.log(gameData.data?.name || "<< Not found >>");
      // >> Get the needed information
      let { id, name, description, released, rating, genres, platforms } = gameData.data;
      // >> Create the game entry on the table
      let game = await Videogame.create({
        // >> The ids on my table aren't the same as in the rawg api
        id: `local_${id}`, name, released, rating, description 
      });
      ++count;
      // >> Get list of genres
      let genreData = genres.map( g => ({ id: g.id, name: g.name }));
      for (let gd of genreData) {
        console.log(gd.id);
        let [ genre, created ] = await Genre.findOrCreate({
          where: {
            id: gd.id,
            name: gd.name,
          }
        });
        game.addGenre(genre);
        console.log('genero agregado');
      }
      // >> Get list of platforms
      let platformData = platforms.map( p => ({ id: p.platform.id, name: p.platform.name }));
      for (let pd of platformData) {
        let [ platform, created ] = await Platform.findOrCreate({
          where: {
            id: pd.id,
            name: pd.name,
          }
        });
        game.addPlatform(platform);
      }
    } catch (error) {
      console.log('[[(( error ))]]');
      console.log(error);
      break;
    }
    ++i;
  }
  // >> End
});
