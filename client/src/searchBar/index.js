import './search.css';


function SearchBar() {

  return (
    <div className='search'>

      <span>MEC</span>

      <form className='searchForm'>
        <input type='text' id='isearch' name='isearch' placeholder='fuck' />
        <label htmlFor='isearch'>Search</label>
      </form>

    </div>
  );
}

export default SearchBar;
