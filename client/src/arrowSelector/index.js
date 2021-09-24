import './arrow.css';
import arrow from './arrow.svg';
import { useState } from 'react';


function Selector() {

  const [ state, setState ] = useState({
    up: true
  });

  function flip() {
    setState({ ...state, up: !state.up });
  }

  return (
    <div className='arrow' onClick={flip} >
      <img src={arrow} className={state.up ? 'up' : 'down'} alt='' />
    </div>
  );
}

export default Selector;
