import './home.css';
import btn from './img/enterButton.png';
import magicBlue from './img/magicCircleBlue.png';
import magicMagenta from './img/magicCircleMagenta.png';
import { NavLink } from 'react-router-dom';
//>> Redux
//>> for preloading the games
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { useEffect } from 'react';


function Home({ preLoad, games, fullPreload }) {

  // >> Load games for the first time
  /*
  useEffect(function() {
    let id = 1;
    while (id < 100) {
      console.log(`add game '${id}'`);
      preLoad(id);
      ++id;
    }
  }, []);
  */ 
  useEffect(() => (games.length === 0) && fullPreload(), []);


  return (
    <div className="home">
      <header>
      </header>
      <div className='magic'>
        <img className='magenta' src={magicMagenta} alt='' />
      </div>
      <div className='magic'>
        <img className='blue' src={magicBlue} alt='' />
      </div>
      <div className='enterBtn'>
        <NavLink to='/main'>
          <img src={btn} alt='' />
        </NavLink>
      </div>
      <div className="Slider">
        <div class="big">
          <div class="slide"></div>
          <div class="slide"></div>
          <div class="slide"></div>
          <div class="slide"></div>
          <div class="slide"></div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    games: state.games,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
