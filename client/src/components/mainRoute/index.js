import './main.css';
import { NavLink } from 'react-router-dom';
import Card from '../card';
import Selector from '../selector';
import ArrowSelector from '../arrowSelector';
// >> Redux
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { useState, useEffect } from 'react';

function MainPage({ loading, games, from, setFrom, orderBy, filterBy, ascending, search, searchResult }) {
  //>> We're gonna use the redux state (pre loaded games)
  //>> and filter from here

  //useEffect(getData, []);
  useEffect(() => console.log("i'm in main"));
  
  const [ state, setState ] = useState({
    count: 15,
    external: true,
  });

  let list;
  //>> choose what we will show
  if (search) {
    list = searchResult;
  } else {
    list = games;
  }

  //>> Order the array
  if (orderBy === 'name') {
    if (ascending) {
      list.sort((o, p) => o.name < p.name ? -1 : 1);
    } else {
      list.sort((o, p) => o.name > p.name ? -1 : 1);
    }
  } else if (orderBy === 'rating') {
    if (ascending) {
      list.sort((o, p) => p.rating - o.rating);
    } else {
      list.sort((o, p) => o.rating - p.rating);
    }
  }


  function next() {
    if (from + state.count < games.length - 1) 
      setFrom(from + state.count);
  }

  function prev() {
    if (from > 0)
      setFrom(from - state.count);
  }
  
  function reset() {
    setFrom(0);
  }


  return (
    <div className='main'>

      <div className='panel'>
        <div className='buttons'>
          <NavLink id='newgame' to='/main/create'>Add new game</NavLink>
        </div>
        <div className='buttons'>
          <Selector text='Order by:' options={['a-z', 'rating']} />
          <ArrowSelector />
          <Selector text='Filter by:' options={['None', 'genre', 'created by']} />
        </div>
      </div>

      <div className='prevNext'>
        <button onClick={reset} title='top'>^</button>
        <button onClick={prev} title='previous'>&lt;</button>
        <button onClick={next} title='next'>&gt;</button>
      </div>
      {/* I'm using 'games.length' instead of 'loading' to speed up testing */}
      {list.length < 1 ? <div className='mainView'><h1 className='loading'>Loading . . .</h1></div> :
      <div className='mainView'>
        {list.slice(from, from + state.count).map( g => (<Card genres={g.genres.join(', ')} title={g.name} rating={g.rating} background={g.image} id={g.id} key={g.id} />))}
      </div>}

    </div> 
  );
}

function mapStateToProps(state) {
  return {
    games: state.games,
    loading: state.loading,
    from: state.from,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    ascending: state.ascending,
    search: state.search,
    searchResult: state.searchResult,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
