import * as actions from '../constants';


const initialState = {
  games: [],
  detail: {},
  loading: false,
  loadingDetails: false,
  orderBy: 'name',
  filterBy: 'external',
  ascending: true,
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
    case actions.FILTER_API:
      return { ...state, filterBy: 'external' };
    case actions.FILTER_LOCAL:
      return { ...state, filterBy: 'local' };
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
    case actions.NEXT:
      return { ...state, next: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
