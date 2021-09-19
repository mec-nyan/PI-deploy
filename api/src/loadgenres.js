const process = require('process');
require('dotenv').config();
const axios = require('axios');
const { KEY } = process.env;
const { Genre } = require('../src/db');

/* 
 * We can use only these routes:
 *
GET https://api.rawg.io/api/games
GET https://api.rawg.io/api/games?search={game}
GET https://api.rawg.io/api/genres
GET https://api.rawg.io/api/games/{id}
*
* /genres?key=etc returns { count, ..., results: [ { id, name, slug, games: [] }, ..., ] }
*
*/ 

const genresUrl = 'https://api.rawg.io/api/genres';

async function load() {
  // >> We assume the connection is already done, otherwire
  // >> we'll need to import 'conn' from db and call 'conn.sync()' before all this
  console.log(`key: ${KEY}`);
  try {
    let genreData = await axios.get(`${genresUrl}?key=${KEY}`);
    console.log('axios passed');
    genreData = genreData.data.results.map( r => ({id: r.id, name: r.name, slug: r.slug }));
    for (let gd of genreData) {
      let [ genre, created ] = await Genre.findOrCreate({
        where: {
          id: gd.id,
          name: gd.name,
          slug: gd.slug,
        }
      });
      if (created) {
        console.log(`Genre '${gd.name}' created`);
      } else {
        console.log(`Genre '${gd.name}' already exists`);
      }
    }
  } catch (err) {
    console.log('[[(( Oops! ))]]');
    //console.log(err);
  }
}

// test it
//load();
// It works!

module.exports = load;
