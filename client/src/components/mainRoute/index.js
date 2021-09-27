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
import { getData } from '../../actions';

function MainPage({ loading, games, getData }) {

  useEffect(getData, []);
  useEffect(() => console.log("i'm in main"));
  
  //if (loading) return <h1>Loading...</h1>;

  //let cards = games.map( g => (<Card genres={g.genres.join(', ')} title={g.name} rating={g.rating} background={g.image} id={g.id} key={g.id} />));

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

      {loading ? <div className='mainView'><h1>Loading...</h1></div> :
      <div className='mainView'>
        {games.map( g => (<Card genres={g.genres.join(', ')} title={g.name} rating={g.rating} background={g.image} id={g.id} key={g.id} />))}
      </div>}

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
