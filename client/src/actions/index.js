import DEFAULT_ACTION from '../constants/index.js';
import axios from 'axios';

import store from '../store/index.js';


//axios.get(`https://api.rawg.io/api/games/${i}?key=dc0bb9763e7b4381839bc1ed7a3b70e2`);
function getGames() {
  return {
    type: DEFAULT_ACTION,
    payload: 'hello world',
  };
}


//let games = await axios('http://localhost:3001/videogames');
//console.log(games.data.output);

store.dispatch(getGames());
console.log(store.getState());

export default getGames;
