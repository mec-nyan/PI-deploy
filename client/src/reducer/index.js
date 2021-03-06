import * as actions from '../constants';


const initialState = {
  games: [],
  genres: [],
  platforms: [],
  searchResult: [],
  search: false,
  detail: {},
  loading: false,
  loadingDetails: false,
  orderBy: 'name',
  filterBy: 'None',
  ascending: true,
  from: 0,
  next: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ORDER_BY_RATING:
      return { ...state, orderBy: 'rating' };
    case actions.ORDER_BY_NAME:
      return { ...state, orderBy: 'name' };
    case actions.ASCENDING:
      return { ...state, ascending: true };
    case actions.DESCENDING:
      return { ...state, ascending: false };
    case 'ORDER_TOGGLE':
      return { ...state, ascending: !state.ascending };
    case actions.FILTER_API:
      return { ...state, filterBy: 'external' };
    case actions.FILTER_LOCAL:
      return { ...state, filterBy: 'local' };
    case actions.FILTER_BY:
      return { ...state, filterBy: action.payload };
    case actions.GET_START:
      return { ...state, loading: true };
    case actions.GET_END:
      return {
        ...state,
        loading: false,
        games: action.payload,
      };
    case actions.DETAILS_START:
      return { ...state, loadingDetails: true };
    case actions.GET_DETAILS:
      return {
        ...state,
        loadingDetails: false, 
        detail: action.payload,
      };
    case actions.POST_START:
      return { ...state, loading: true };
    case actions.POST_END:
      return { ...state, loading: false };
    case actions.PRELOAD:
      if (action.payload.name) {
        console.log('game added: ' + action.payload.name);
        return {
          ...state,
          games: [ ...state.games, action.payload ],
        };
      } else {
        console.log('game rejected with ');
        return state;
      }
    case actions.FULL_PRELOAD:
      return { 
        ...state, 
        games: action.payload,
        loading: false,
      };
    case actions.NEXT:
      return { ...state, next: action.payload };
    case actions.FROM:
      return { ...state, from: action.payload };
    case actions.GET_GENRES:
      return { ...state, genres: action.payload.genres };
    case actions.GET_PLATFORMS:
      return { ...state, platforms: action.payload };
    case actions.FIND_BY_NAME:
      return { 
        ...state, 
        searchResult: action.payload, 
        loading: false,
        search: true,
      };
    case actions.RESET:
      return { ...state, search: false };
    default:
      return state;
  }
}

export default rootReducer;
