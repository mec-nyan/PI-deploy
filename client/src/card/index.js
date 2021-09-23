import './card.css';
import { NavLink } from 'react-router-dom';


function Card() {

  return (
    <div className='card'>

      <h1>New game</h1>

      <NavLink to='/main'>
        <button>Back</button> 
      </NavLink>

    </div>
  );
}

export default Card;
