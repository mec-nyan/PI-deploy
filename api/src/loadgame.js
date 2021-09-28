// >> Get game info from Rawg and store it locally
const process = require('process');
const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const url = ' https://api.rawg.io/api/games';
const { Videogame, Genre, Platform } = require('../src/db');


//>> mockup games for testing
const games = [
  { 
    name: 'mario',
    description: 'bros',
    released: 'today',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'pacman',
    description: 'rules',
    released: 'yesterday',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'tateti',
    description: 'clasico',
    released: 'tomorrow',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'ajedrez',
    description: 'ni en pedo',
    released: 'hoy',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'rayuela',
    description: 'wtf',
    released: 'ayer',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'chin chon',
    description: 'cartas',
    released: 'anteayer',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'canasta',
    description: 'genial',
    released: 'last month',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'scrabble',
    description: 'buenisimo',
    released: 'sometime',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'truco',
    description: 'puede fallar',
    released: '???',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'payana',
    description: 'son duras las piedras',
    released: 'una vez',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
  { 
    name: 'trompo',
    description: 'piola',
    released: 'jajaja',
    rating: 1.2 ,
    genres: ['Accion', 'Aventura', 'Romance'],
    platforms: ['ps2', 'xbox', 'wii']
  },
];


async function loadGames() {
  for (let g of games) {
    try {
      let game = await Videogame.create({
        name: g.name,
        description: g.description,
        released: g.released,
        rating: g.rating,
      });

      await bindGenre(game, g.genres);

      await bindPlatform(game, g.platforms);

    } catch (err) {
      console.log('Oooooops');
      return false;
    }
  }
  return true;
}


async function bindGenre(game, genres) {
  // >> Get list of genres
  for (let gd of genres) {
    let [ genre, created ] = await Genre.findOrCreate({
      where: {
        name: gd,
        slug: gd.toLowerCase(),
      }
    });
    await game.addGenre(genre); // Is 'await' necesary?
    console.log(`\tGenre [ ${genre.name} ] has been linked to "${game.name}`);
  }
}

async function bindPlatform(game, platforms) {
  // >> Get list of platforms
  for (let pd of platforms) {
    let [ platform, created ] = await Platform.findOrCreate({
      where: {
        name: pd,
        slug: pd.toLowerCase(),
      }
    });
    await game.addPlatform(platform); // Is 'await' necesary?
    console.log(`\tPlatform [ ${platform.name} ] has been linked to "${game.name}`);
  }
}

module.exports = loadGames;

// test 
loadGames();
