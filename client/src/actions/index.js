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

function filterApi() {
  return { type: constants.FILTER_API };
}

function fileterLocal() {
  return { type: constants.FILTER_LOCAL };
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

export {
  orderByRating,
  orderByName,
  orderAscending,
  orderDescending,
  fileterLocal,
  filterApi,
  getStart,
  getEnd,
  postStart,
  postEnd,
  next,
  getData,
  getDetails,
  preLoad,
}
