import './selector.css';
import { useState } from 'react';


function Selector({ text, options }) {

  const [ state, setState ] = useState({
    hidden: 'hidden',
    selection: options[0],
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

export default Selector;
