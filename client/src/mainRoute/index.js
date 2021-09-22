import './main.css';
import { NavLink } from 'react-router-dom';
import SearchBar from '../searchBar';


function MainPage() {

  return (
    <div className='main'>

      <SearchBar />

      <h1>Main Page</h1>

      <NavLink to='/detail'>
        <button>Game detail</button>
      </NavLink>

      <NavLink to='/create'>
        <button>New game</button>
      </NavLink>

      <NavLink to='/'>
        <button>Back</button>
      </NavLink>

    </div> 
  );
}


export default MainPage;
