import './detail.css';
import { NavLink } from 'react-router-dom';


function GameDetail() {

  return (
    <div className='detail'>

      <h1>Game detail</h1>

      <NavLink to='/main'>
        <button>Back</button>
      </NavLink>

    </div> 
  );
}


export default GameDetail;
