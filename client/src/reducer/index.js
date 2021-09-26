import DEFAULT_ACTION from '../constants/index.js';


const initialState = {
  games: ''
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return { ...state, games: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
