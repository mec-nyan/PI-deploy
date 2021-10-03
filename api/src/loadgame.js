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
    image: "https://media.rawg.io/media/screenshots/f22/f22857f426275f7a09d865a2ad2376b9.jpg",
    platforms: getPlatforms(),
  },
  { 
    name: 'Canasta',
    description: 'El juego favorito de mi mamá, junto con el scrabble.',
    released: '15-8-1940',
    rating: 6.2 ,
    genres: ['Card', 'Family'],
    image: "https://media.rawg.io/media/screenshots/67e/67e73815c84bd38f8d841d9d48ce817a.jpg",
    platforms: getPlatforms(),
  },
  { 
    name: 'Devs May Cry',
    description: placeholder,
    released: '4-4-1944',
    rating: 3.7 ,
    genres: getGenres(),
    image:  "https://media.rawg.io/media/games/9fb/9fbf956a16249def7625ab5dc3d09515.jpg",
    platforms: getPlatforms(),
  },
  { 
    name: 'Callback of Duty',
    description: placeholder,
    released: '15-12-2000',
    rating: 4.1 ,
    genres: getGenres(),
    image: "https://media.rawg.io/media/games/9c5/9c5bc0b6e67102bc96dcf1ba41509e42.jpg",
    platforms: getPlatforms(),
  },
  { 
    name: 'Recursive Evil II',
    description: placeholder,
    released: '23-5-1998',
    rating: 3.2 ,
    genres: getGenres(),
    image: "https://media.rawg.io/media/games/f6f/f6f39c5b56413f7f4513b25989a1b747.jpg",
    platforms: getPlatforms(),
  },
  { 
    name: 'Mortal Kallback',
    description: placeholder,
    released: '9-11-2005',
    rating: 2.6 ,
    genres: getGenres(),
    image: "https://media.rawg.io/media/games/a1c/a1c2aeb81916f5a84aa5dbcb9539fbbf.jpg",
    platforms: getPlatforms(),
  },
  { 
    name: 'Full Stack Alchemist',
    description: placeholder,
    released: '16-8-2011',
    rating: 3.5 ,
    genres: getGenres(),
    image: "https://media.rawg.io/media/screenshots/97d/97d6fdf98d19a05a42df7f6478b658b6.jpg",
    platforms: getPlatforms(),
  },
];


async function loadGames() {
  for (let g of games) {
    try {
      let game = await Videogame.create({
        name: g.name,
        slug: g.name.toLowerCase(),
        description: g.description,
        released: g.released,
        rating: g.rating,
        image: g.image,
      });

      await bindGenre(game, g.genres);

      await bindPlatform(game, g.platforms);

    } catch (err) {
      console.log('Oooooops');
      console.log(err);
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
