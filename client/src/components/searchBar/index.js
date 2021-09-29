import './search.css';

// >> Redux
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';


function SearchBar({ findByName, reset, search, searchResult, setFrom }) {

  const [ state, setState ] = useState({
    isearch: '',
    text: 'Find it!',
    redirect: false,
  });

  function findIt(e) {
    e.preventDefault();
    if (state.isearch.length > 0) {
      setState({ ...state, text: 'Clear' });
      findByName(state.isearch);
      setFrom(0);
      console.log(searchResult);
    } else {
      console.log('search bar is empty!');
    }
  }

  function clearIt(e) {
    e.preventDefault();
    if (search) {
      setState({ ...state, isearch: '', text: 'Find it!' });
      reset();
    } else {
      findIt(e);
    }
  }

  function handleInputChange(e) {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
    //console.log(state.isearch);
  }

  return (
    <>
      <div className='search'>

        <form className='searchForm'>
          <input 
            type='text' 
            id='isearch' 
            name='isearch' 
            value={state.isearch} 
            placeholder='search for games ...' 
            onChange={handleInputChange}
          />
          <label htmlFor='isearch' onClick={clearIt}>{state.text}</label>
          <input type='submit' onClick={findIt} value='Go!' />
        </form>

      </div>
      <div className='line'></div>
    </>
  );
}


function mapStateToProps(state) {
  return {
    search: state.search,
    searchResult: state.searchResult,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
