import './create.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

// >> Redux
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function CreateGame({ genres, getGenres, loading, postGame }) {
  const [ state, setState ] = useState({
    genres: [],
    platforms: [],
    showGenres: false,
    showPlatforms: false,
  });

  useEffect(() => console.log("Im in create"));
  useEffect(() => console.log('GENRES IS: ', genres), []);
  useEffect(function() {
    if (genres.length === 0) {
      getGenres();
    }
  }, []);
  useEffect(() => console.log(genres), []);


  let platforms = [
    'PC',
    'Playstation 3',
    'Playstation 4',
    'Playstation 5',
    'Xbox',
    'Xbox One',
    'Wii',
    'Nintendo switch',
  ];

  function showGenres() {
    setState({ ...state, showGenres: true });
  }

  function hideGenres() {
    setState({ ...state, showGenres: false });
  }

  function showPlatforms() {
    setState({ ...state, showPlatforms: true });
  }

  function hidePlatforms() {
    setState({ ...state, showPlatforms: false });
  }

  return (
    <div className='create'>

      <h1>New game</h1>

      <form className='gameForm'>

        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          placeholder='name...'
        />

        <label htmlFor='released'>Released:</label>
        <input
          type='text'
          name='released'
          placeholder='name...'
        />

        <label htmlFor='rating'>Rating:</label>
        <input
          type='text'
          name='rating'
          placeholder='name...'
        />

        <label htmlFor='description'>Description:</label>
        <textarea
          type='text'
          name='description'
          placeholder='name...'
          cols='30'
          rows='6'
        />

        <span className='selBtn' onClick={showGenres}>Select genre</span>
        <div className={'selectGenre ' + (state.showGenres ? 'selectVisible' : 'selectHidden')}>
          <div className='inner'>
            <label>Genre:</label>

            <div className='list'>
              {Array.isArray(genres) && genres.map( g => {
                return (<div className='sel'>
                  <input
                    type='checkbox'
                    name={g}
                    value={g}
                    id={'id_' + g}
                  />
                  <span className='circle'></span>
                  <label htmlFor={g} >{g}</label>
                </div>)})
              }
            </div>
            <label htmlFor='otherGenre'>Other:</label>
            <input
              type='text'
              name='otherGenre'
              placeholder='new genre'
              size='35'
            />
            <span className='add'>Add</span>
            <span className='ok' onClick={hideGenres}>Ok</span>
          </div>
        </div>

        <span className='selBtn' onClick={showPlatforms}>Select platform</span>
        <div className={'selectPlatform ' + (state.showPlatforms ? 'selectVisible' : 'selectHidden')}>
          <div className='inner'>
            <label>Platforms:</label>

            <div className='list'>
              {platforms.map( p => {
                return (<div className='sel'>
                  <input
                    type='checkbox'
                    name={p}
                    value={p}
                    id={'id_' + p}
                  />
                  <span className='circle'></span>
                  <label htmlFor={p} >{p}</label>
                </div>)})
              }
            </div>
            <div>
              <label htmlFor='otherPlatform'>Other</label>
              <input
                type='text'
                name='otherPlatform'
                placeholder='new platform'
                size='35'
              />
              <span className='add'>Add</span>
            </div>
            <div>
              <span className='ok' onClick={hidePlatforms}>Ok</span>
            </div>
          </div>
        </div>

        <input
          type='submit'
          value='Add game'
        />
      </form>
      <NavLink className='floatingButton' to='/main'>
        <span>Back</span> 
      </NavLink>

    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    genres: state.genres,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame);
