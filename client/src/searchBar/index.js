import './search.css';
import logo from './logoMec.png';


function SearchBar() {

  return (
    <div className='search'>

      <img src={logo} alt='MEC' />

      <form className='searchForm'>
        <input type='text' id='isearch' name='isearch' placeholder='search for games ...' />
        <label htmlFor='isearch'>Find it!</label>
      </form>

    </div>
  );
}

export default SearchBar;
