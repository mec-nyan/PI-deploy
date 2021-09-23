import './main.css';
import { NavLink } from 'react-router-dom';
import Card from '../card';


function MainPage() {

  return (
    <div className='main'>

      <h1>Main Page</h1>

      <NavLink to='/main/detail'>
        <button>Game detail</button>
      </NavLink>

      <NavLink to='/main/create'>
        <button>New game</button>
      </NavLink>

      <Card />

    </div> 
  );
}


export default MainPage;
