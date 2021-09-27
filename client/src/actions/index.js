import { ORDER_BY_RATING, ORDER_BY_NAME, ASCENDING, DESCENDING } from '../constants/index.js'; 
import { FILTER_API, FILTER_LOCAL, GET_START, GET_END, GET_DETAILS } from '../constants/index.js';
import { POST_START, POST_END, NEXT } from '../constants/index.js';
import axios from 'axios';


function orderByRating() {
  return { type: ORDER_BY_RATING };
}

function orderByName() {
  return { type: ORDER_BY_NAME };
}

function orderAscending() {
  return { type: ASCENDING };
}

function orderDescending() {
  return { type: DESCENDING };
}

function filterApi() {
  return { type: FILTER_API };
}

function fileterLocal() {
  return { type: FILTER_LOCAL };
}

function getStart() {
  return { type: GET_START };
}

function getEnd(payload) {
  return { type: GET_END, payload };
}

function postStart() {
  return { type: POST_START };
}

function postEnd() {
  return { type: POST_END };
}

function next(n) {
  return { type: NEXT, payload: n };
}

function getDetails(id) {
  console.log('fetching details');
  return dispatch => {
    dispatch({ type: 'DETAILS_START' });
    axios.get(`http://localhost:3001/videogame/${id}`)
      .then(r => r.data)
      .then(d => dispatch({ type: GET_DETAILS, payload: d }))
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
}
