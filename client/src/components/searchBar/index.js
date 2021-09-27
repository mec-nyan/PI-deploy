import './search.css';


function SearchBar() {

  return (
    <>
      <div className='search'>

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
