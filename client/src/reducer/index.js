import DEFAULT_ACTION from '../constants/index.js';


const initialState = {
  games: [],
  loading: false,
  orderBy: 'name',
  filterBy: 'external',
  ascending: true,
  next: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_BY_RATING:
      return { ...state, orderBy: 'rating' };
    case ORDER_BY_NAME:
      return { ...state, orderBy: 'name' };
    case ASCENDING:
      return { ...state, ascending: true };
    case DESCENDING:
      return { ...state, ascending: false };
    case FILTER_API:
      return { ...state, filterBy: 'external' };
    case FILTER_LOCAL:
      return { ...state, filterBy: 'local' };
    case GET_START:
      return { ...state, loading: true };
    case GET_END:
      return {
        ...state,
        loading: false,
        games: action.payload,
      };
    case POST_START:
      return { ...state, loading: true };
    case POST_END:
      return { ...state, loading: false };
    case NEXT:
      return { ...state, next: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
