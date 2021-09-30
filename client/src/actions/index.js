import * as constants from '../constants';
import axios from 'axios';


function orderByRating() {
  return { type: constants.ORDER_BY_RATING };
}

function orderByName() {
  return { type: constants.ORDER_BY_NAME };
}

function orderAscending() {
  return { type: constants.ASCENDING };
}

function orderDescending() {
  return { type: constants.DESCENDING };
}

function orderToggle() {
  return { type: 'ORDER_TOGGLE' };
}

function filterApi() {
  return { type: constants.FILTER_API };
}

function filterLocal() {
  return { type: constants.FILTER_LOCAL };
}

function setFilter(f) {
  return { type: constants.FILTER_BY, payload: f };
}

function getStart() {
  return { type: constants.GET_START };
}

function getEnd(payload) {
  return { type: constants.GET_END, payload };
}

function postStart() {
  return { type: constants.POST_START };
}

function postEnd() {
  return { type: constants.POST_END };
}

function next(n) {
  return { type: constants.NEXT, payload: n };
}

function setFrom(n) {
  return { type: constants.FROM, payload: n };
}

function reset() {
  return { type: constants.RESET };
}

function getDetails(id) {
  console.log('fetching details');
  return dispatch => {
    dispatch({ type: constants.DETAILS_START });
    axios.get(`http://localhost:3001/videogame/${id}`)
      .then(r => r.data)
      .then(d => dispatch({ type: constants.GET_DETAILS, payload: d }))
      .catch(e => console.log(e));
  }
}

function getData() {
  console.log('fetching data');
  return dispatch => {
    dispatch(getStart());
    axios.get(`http://localhost:3001/videogames`)
      .then(r => r.data)
      .then(d => dispatch(getEnd(d)))
      .catch(e => console.log(e));
  }
}

function preLoad(id) {
  console.log(`Function preLoad: preloading game [${id}]`);
  return dispatch => {
    dispatch({ type: constants.GET_START });
    axios.get(`http://localhost:3001/videogame/${id}`)
      .then(r => r.data)
      .then(d => dispatch({ type: constants.PRELOAD, payload: d }))
      .catch(e => console.log(e));
  }
}

function fullPreload() {
  console.log('Full preload from 3001/videogames');
  return dispatch => {
    dispatch({ type: constants.GET_START });
    axios.get(`http://localhost:3001/videogames`)
      .then(r => r.data)
      .then(d  => dispatch({ type: constants.FULL_PRELOAD, payload: d }))
      .catch(() => console.log('axios error in function "fullPreload"'));
  }
}

function postGame(data) {
  console.log('Posting new game');
  return dispatch => {
    dispatch(postStart());
    axios.post(`http://localhost:3001/videogame`, data)
      .then(r => r.data)
      .then(d => dispatch({ type: constants.PRELOAD, payload: d }))
      .then(() => dispatch(postEnd()))
      .catch(e => console.log('error in postGame: ', e));
  }
}

function getPlatforms() {
  console.log('Getting platforms');
  return dispatch => {
    axios.get(`http://localhost:3001/platforms`)
      .then(r => r.data)
      .then(d => dispatch({ type: constants.GET_PLATFORMS, payload: d}))
      .catch(e => console.log('Error in "getPlatforms"', e));
  }
}

function getGenres() {
  console.log('Getting genres');
  return dispatch => {
    axios.get(`http://localhost:3001/genres`)
      .then(r => r.data)
      .then(d => {
        console.log('DATA IS ', d);
        return d;
      })
      .then(d => dispatch({ type: constants.GET_GENRES, payload: d}))
      .catch(e => console.log('Error in "getGenres">>', e));
  }
}

function findByName(name) {
  console.log('Searching by name');
  return dispatch => {
    dispatch({ type: constants.GET_START });
    axios.get(`http://localhost:3001/videogames?name=${name}`)
      .then(r => r.data)
      .then(d  => dispatch({ type: constants.FIND_BY_NAME, payload: d }))
      .catch(() => console.log('axios error in function "findByName"'));
  }
}


export {
  orderByRating,
  orderByName,
  orderAscending,
  orderDescending,
  orderToggle,
  filterLocal,
  filterApi,
  setFilter,
  getStart,
  getEnd,
  postStart,
  postEnd,
  postGame,
  next,
  getData,
  getDetails,
  preLoad,
  fullPreload,
  setFrom,
  getGenres,
  getPlatforms,
  findByName,
  reset,
}
