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

function MainPage({ loading, games }) {
  //>> We're gonna use the redux state (pre loaded games)
  //>> and filter from here

  //useEffect(getData, []);
  useEffect(() => console.log("i'm in main"));
  
  const [ state, setState ] = useState({
    from: 0,
    count: 15,
    order: 'name',
    asc: true,
    external: true,
  });

  function next() {
    if (state.from + state.count < games.length - 1) 
      setState({ ...state, from: state.from + state.count });
  }

  function prev() {
    if (state.from > 0)
      setState({ ...state, from: state.from - state.count });
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
          <Selector text='Filter by:' options={['genre', 'created by']} />
        </div>
      </div>

      <div className='prevNext'>
        <button onClick={prev}>&lt;</button>
        <button onClick={next}>&gt;</button>
      </div>

      <div className='mainView'>
        {games.slice(state.from, state.from + state.count).map( g => (<Card genres={g.genres.join(', ')} title={g.name} rating={g.rating} background={g.image} id={g.id} key={g.id} />))}
      </div>

    </div> 
  );
}

function mapStateToProps(state) {
  return {
    games: state.games,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
