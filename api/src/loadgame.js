// >> Get game info from Rawg and store it locally
const process = require('process');
const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const url = ' https://api.rawg.io/api/games';
const { Videogame, Genre, Platform } = require('../src/db');


module.exports = async function (_id) {
  try {
    // >> fetch the data
    const gameData = await axios.get(`${url}/${_id}?key=${KEY}`);
    // >> Get the needed information
    let { id, slug, name, description, released, rating, genres, platforms } = gameData.data;
    // >> Create the game entry on the table
    let game = await Videogame.create({ rawgId: id, name, slug, released, rating, description });
    console.log(`Game [ ${game.name} ] has been added to the table "Videogame"`);
    // >> Get list of genres
    await bindGenre(game, genres);
    // >> Get list of platforms
    await bindPlatform(game, platforms);

    return true;
  } catch (error) {
    console.log('[[(( error ))]]');
    //console.log(error);
    return false;
  }
}


async function bindGenre(game, genres) {
  // >> Get list of genres
  let genreData = genres.map( g => ({ id: g.id, name: g.name, slug: g.slug }));
  for (let gd of genreData) {
    let [ genre, created ] = await Genre.findOrCreate({
      where: {
        id: gd.id,
        name: gd.name,
        slug: gd.slug,
      }
    });
    await game.addGenre(genre); // Is 'await' necesary?
    console.log(`\tGenre [ ${genre.name} ] has been linked to "${game.name}`);
  }
}

async function bindPlatform(game, platforms) {
  // >> Get list of platforms
  let platformData = platforms.map( p => ({ id: p.platform.id, name: p.platform.name, slug: p.platform.slug }));
  for (let pd of platformData) {
    let [ platform, created ] = await Platform.findOrCreate({
      where: {
        id: pd.id,
        name: pd.name,
        slug: pd.slug,
      }
    });
    await game.addPlatform(platform); // Is 'await' necesary?
    console.log(`\tPlatform [ ${platform.name} ] has been linked to "${game.name}`);
  }
}
