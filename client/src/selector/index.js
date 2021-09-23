import './selector.css';
import { useState } from 'react';


function Selector() {

  const [ state, setState ] = useState({
    hidden: 'hidden',
    selection: 'A-Z',
  });

  function showPopup() {
    setState({ ...state, hidden: 'visible' });
  }

  function hidePopup() {
    setState({ ...state, hidden: 'hidden' });
  }

  function Select(e) {
    setState({ ...state, selection: e.target.innerText, hidden: 'hidden' });
  }

  return (
    <div className='selector' >
      <span className='visible' onClick={showPopup}>Order by: {state.selection}</span>
      <div className={state.hidden + ' popup'}>
        <div className={'selection' + (state.selection === 'A-Z' ? ' selected': '')} onClick={e => Select(e)}>A-Z</div>
        <div className={'selection' + (state.selection === 'Rating' ? ' selected': '')} onClick={e => Select(e)}>Rating</div>
      </div>
    </div>
  );
}

export default Selector;
