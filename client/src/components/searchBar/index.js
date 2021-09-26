import './search.css';
import logo from './logoMec.png';
import { NavLink } from 'react-router-dom';


function SearchBar() {

  return (
    <>
      <div className='search'>

        {/*
        <NavLink to='/'>
          <img src={logo} alt='MEC' />
        </NavLink>
        */}

        <form className='searchForm'>
          <input type='text' id='isearch' name='isearch' placeholder='search for games ...' />
          <label htmlFor='isearch'>Find it!</label>
        </form>

      </div>
      <div className='line'></div>
    </>
  );
}

export default SearchBar;
