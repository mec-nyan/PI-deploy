import './create.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';


function CreateGame() {
  const [ state, setState ] = useState({
    genres: [],
    platforms: [],
    showGenres: false,
    showPlatforms: false,
  });

  let platforms = [
    'PC',
    'Playstation 1',
    'Playstation 2',
    'Playstation 3',
    'Playstation 4',
    'Playstation 5',
    'Xbox',
    'Xbox One',
    'Wii',
  ];

  let genres = [
    'Adventure',
    'Action',
    'RPG',
    'FPS',
    'MMOG',
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

        <label htmlFor='description'>Description:</label>
        <input
          type='text'
          name='description'
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

        <span onClick={showGenres}>Select genre</span>
        <div className={'selectGenre ' + (state.showGenres ? 'selectVisible' : 'selectHidden')}>
          <div className='inner'>
            <label>Genre:</label>

            {genres.map( g => {
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
            <label htmlFor='otherGenre'>Other:</label>
            <input
              type='text'
              name='otherGenre'
              placeholder='new genre'
            />
            <span className='add'>Add</span>
            <span className='ok' onClick={hideGenres}>Ok</span>
          </div>
        </div>

        <span onClick={showPlatforms}>Select platform</span>
        <div className={'selectPlatform ' + (state.showPlatforms ? 'selectVisible' : 'selectHidden')}>
          <div className='inner'>
            <label>Platforms:</label>

            {platforms.map( p => {
              return (<div>
                <input
                  type='checkbox'
                  name={p}
                  value={p}
                  id={'id_' + p}
                />
                <label htmlFor={p} >{p}</label>
              </div>)})
            }
            <div>
              <label htmlFor='otherPlatform'>Other</label>
              <input
                type='text'
                name='otherPlatform'
                placeholder='new platform'
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

export default CreateGame;
