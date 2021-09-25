import './create.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';


function CreateGame() {
  const [ state, setState ] = useState({
    genres: [],
    platforms: [],
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

        <button>Select genre</button>
        <div className='selectGenre'>
          <label>Genre:</label>

          {genres.map( g => {
            return (<div>
              <input
                type='checkbox'
                name={g}
                value={g}
                id={'id_' + g}
              />
              <label htmlFor={g} >{g}</label>
            </div>)})
          }
          <label htmlFor='otherGenre'>Other</label>
          <input
            type='text'
            name='otherGenre'
            placeholder='new genre'
          />
          <button>Ok</button>
          <button>Cancel</button>
        </div>

        <button>Select platform</button>
        <div className='selectPlatform'>
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
          <label htmlFor='otherPlatform'>Other</label>
          <input
            type='text'
            name='otherPlatform'
            placeholder='new platform'
          />
          <button>Ok</button>
          <button>Cancel</button>
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
