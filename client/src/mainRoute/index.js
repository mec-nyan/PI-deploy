import './main.css';
import { NavLink } from 'react-router-dom';
import SideBar from '../sideBar';
import Card from '../card';


function MainPage() {

  return (
    <div className='main'>

      <h1>Main Page</h1>

      <Card />

      <NavLink to='/main/detail'>
        <button>Game detail</button>
      </NavLink>

      <NavLink to='/main/create'>
        <button>New game</button>
      </NavLink>

    </div> 
  );
}


export default MainPage;
