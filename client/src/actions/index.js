import * from '../constants/index.js';
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

function loading(bool) {
  return { type: LOADING, payload: bool };
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

function getData(id) {
  return function (dispatch) {
    dispatch(getStart());
    axios.get(`http://localhost:3001/videogames/${id}`)
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
  loading,
  getStart,
  getEnd,
  postStart,
  postEnd,
  next,
  getData,
}
