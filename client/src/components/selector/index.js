import './selector.css';
import { useState } from 'react';

// >> Redux
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


function Selector({ text, options, orderByName, orderByRating, setFilter, setFrom }) {

  const [ state, setState ] = useState({
    hidden: 'hidden',
    selection: options[0],
  });

  function showPopup() {
    setState({ ...state, hidden: 'visible' });
  }

  function Select(e) {
    let option = e.target.innerText;
    setState({ ...state, selection: option, hidden: 'hidden' });
    switch (option) {
      case 'a-z':
        orderByName();
        setFrom(0);
        break;
      case 'rating':
        orderByRating();
        setFrom(0);
        break;
      case 'None':
      case 'your games':
      case 'Action':
      case 'Indie':
      case 'Adventure':
      case 'RPG':
      case 'Strategy':
      case 'Shooter':
      case 'Casual':
      case 'Simulation':
      case 'Puzzle':
      case 'Arcade':
      case 'Platformer':
      case 'Racing':
      case 'Massively Multiplayer':
      case 'Sports':
      case 'Fighting':
      case 'Family':
      case 'Board Games':
      case 'Educational':
      case 'Card':
        setFilter(option);
        setFrom(0);
        break;
    }
  }

  return (
    <div className='selector' >
      <div className='text'>
        <span onClick={showPopup}>{text} {state.selection}</span>
      </div>

      <div className={state.hidden + ' popup'}>
        {options.map( o => 
          <div className={'selection' + (state.selection === o ? ' selected': '')} onClick={e => Select(e)}>{o}</div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    ascending: state.ascending,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
