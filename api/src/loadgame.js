const process = require('process');
const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const url = ' https://api.rawg.io/api/games';
const { Videogame, Genre, Platform } = require('../src/db');


const getGenres = () => {
  // get 1 - 4 random genres
  const genres = ['Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Casual', 'Simulation', 'Puzzle', 'Arcade', 'Platformer', 'Racing', 'Massively Multiplayer', 'Sports', 'Fighting', 'Family', 'Board Games', 'Educational', 'Card'];
  //>> 1 - 4 genres
  const count = Math.floor(Math.random() * 4) + 1;
  const out = [];
  const indices = [];
  while (indices.length < count) {
    let i = Math.floor(Math.random() * genres.length);
    if (indices.includes(i)) continue;
    out.push(genres[i]);
    indices.push(i);
  }
  return out;
}

const getPlatforms = () => {
  // get 1 - 4 random platforms
  const platforms = [ 'PC', 'Playstation 3', 'Playstation 4', 'Playstation 5', 'Xbox', 'Xbox One', 'Wii', 'Nintendo switch'];
  //>> 1 - 4 platforms
  const count = Math.floor(Math.random() * 4) + 1;
  const out = [];
  const indices = [];
  while (indices.length < count) {
    let i = Math.floor(Math.random() * platforms.length);
    if (indices.includes(i)) continue;
    out.push(platforms[i]);
    indices.push(i);
  }
  return out;

}

const placeholder = 'Unirte a Henry significa crear conexiones para toda la vida, hacer nuevos amigos y aprovechar oportunidades globales y diversas. Aplica. Zero To Henry Full Stack Web Developer. Bootcamp. Labs. HenryX. Job Prep. Entrenamiento intensivo en el que vas a aprender de computación y desarrollo web desde el principio hasta el final.';

//>> mockup games for testing
const games = [
  { 
    name: 'Super Henry Bros',
    description: placeholder,
    released: '2021-09-27',
    rating: 4.2 ,
    genres: ['Platformer', 'Arcade', 'Puzzle'],
    platforms: getPlatforms(),
  },
  { 
    name: 'Canasta',
    description: 'El juego favorito de mi mamá, junto con el scrabble.',
    released: '15-8-1940',
    rating: 6.2 ,
    genres: ['Card', 'Family'],
    platforms: getPlatforms(),
  },
  { 
    name: 'Devs May Cry',
    description: placeholder,
    released: '4-4-1944',
    rating: 3.7 ,
    genres: getGenres(),
    platforms: getPlatforms(),
  },
  { 
    name: 'Callback of Duty',
    description: placeholder,
    released: '15-12-2000',
    rating: 4.1 ,
    genres: getGenres(),
    platforms: getPlatforms(),
  },
  { 
    name: 'Recursive Evil II',
    description: placeholder,
    released: '23-5-1998',
    rating: 3.2 ,
    genres: getGenres(),
    platforms: getPlatforms(),
  },
  { 
    name: 'Mortal Kallback',
    description: placeholder,
    released: '9-11-2005',
    rating: 2.6 ,
    genres: getGenres(),
    platforms: getPlatforms(),
  },
  { 
    name: 'Full Stack Alchemist',
    description: placeholder,
    released: '16-8-2011',
    rating: 3.5 ,
    genres: getGenres(),
    platforms: getPlatforms(),
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
//loadGames();
