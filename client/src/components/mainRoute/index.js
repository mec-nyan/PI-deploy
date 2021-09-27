import './main.css';
import { NavLink } from 'react-router-dom';
import Card from '../card';
import Selector from '../selector';
import ArrowSelector from '../arrowSelector';
// >> Redux
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getData } from '../../actions';

import { useState, useEffect } from 'react';

function MainPage({ games, getData }) {

  useEffect(getData, []);
  //getData();
  console.log(games);
  
  let cards = games.map( g => (<Card genres={g.genres.join(', ')} title={g.name} rating={g.rating} background={g.image} key={g.id} />));

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

      <div className='mainView'>
        {cards}
      </div>

    </div> 
  );
}

function mapStateToProps(state) {
  return {
    games: state.games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
