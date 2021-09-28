import './arrow.css';
import arrow from './arrow.svg';
import { useState } from 'react';
// >> Redux
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


function Selector({ ascending, orderToggle }) {

  //const [ state, setState ] = useState({
    //up: true
  //});

  function flip() {
    orderToggle();
  }

  return (
    <div className='arrow' onClick={flip} >
      <img src={arrow} className={ascending ? 'up' : 'down'} alt='' />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ascending: state.ascending,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
