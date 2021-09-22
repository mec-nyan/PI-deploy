import './create.css';
import { NavLink } from 'react-router-dom';


function CreateGame() {

  return (
    <div className='create'>

      <h1>New game</h1>

      <NavLink to='/main'>
        <button>Back</button> 
      </NavLink>

    </div>
  );
}

export default CreateGame;
