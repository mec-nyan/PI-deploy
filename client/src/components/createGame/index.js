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
    name: '',
    nameError: '',
    image: '',
    ratingError: '',
    releasedError: '',
    descriptionError: '',
    description: '',
    rating: '',
    released: '',
    message: '',
    showGenres: false,
    showPlatforms: false,
    otherGenre: '',
    otherPlatform: '',
  });

  function resetState() {
    setState({
      ...state,
      genres: [],
      platforms: [],
      name: '',
      description: '',
      rating: '',
      released: '',
      message: '',
    });
  }

  useEffect(() => console.log("Im in create"));
  //useEffect(() => console.log('GENRES IS: ', genres), []);
  useEffect(function() {
    if (genres.length === 0) {
      getGenres();
    }
  }, []);
  useEffect(() => window.scrollTo(0, 0), []);


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

  function handleInputChange(e) {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    //console.log(state[e.target.name]);
  }

  function validate(e) {
    let error = '';
    switch (e.target.name) {
      case 'name':
      case 'description':
        if (e.target.value === '') {
          error = `${e.target.name} can't be empty`;
        } else {
          error = '';
        }
        break;
      case 'rating':
        if (!/^\d+.?\d*$/.test(e.target.value)) {
          error = 'Rating must be a valid number';
        } else {
          error = '';
        }
        break;
      case 'released':
        if (!/^\d{1,2}-\d{1,2}-\d{4}$/.test(e.target.value)) {
          error = 'date must be like dd-mm-yyyy';
        } else {
          error = '';
        }
        break;
      default:
        break;
    }
    setState({ ...state, [e.target.name]: e.target.value, [e.target.name + 'Error']: error });
  }

  function showState(e) {
    e.preventDefault();
    console.log('---> STATE <---');
    console.log(state);
    console.log('---> xxxxx <---');
  }

  function toggleGenre(e) {
    let g = e.target.name;
    setState({
      ...state,
      genres: state.genres.includes(g) 
        ? state.genres.filter(x => x !== g) 
        : [ ...state.genres, g ],
    });
  }

  function togglePlatform(e) {
    let p = e.target.name;
    setState({
      ...state,
      platforms: state.platforms.includes(p) 
        ? state.platforms.filter(x => x !== p) 
        : [ ...state.platforms, p ],
    });
  }

  function addGenre() {
    setState({
      ...state,
      genres: [ ...state.genres, state.otherGenre ],
      otherGenre: '',
    });
  }

  function addPlatform() {
    setState({
      ...state,
      platforms: [ ...state.platforms, state.otherPlatform ],
      otherPlatform: '',
    });
  }

  function submitPost(e) {
    e.preventDefault();
    let game = {
      name: state.name,
      description: state.description,
      released: state.released,
      rating: state.rating,
      genres: state.genres,
      image: state.image,
      platforms: state.platforms,
    };

    if (game.name.length === 0
        || game.description.length === 0 
        || game.released.length === 0 
        || game.rating.length === 0
        || state.nameError.length > 0 
        || state.releasedError.length > 0 
        || state.descriptionError.length > 0 
        || state.ratingError.length > 0) {
      setState({ ...state, message: 'Please fill the required fields' });
      return;
    } else {
      postGame(game);
      setState({ ...state, message: `Game ${game.name} successfully created!` });
    }
  }

  function hideMessage() {
    resetState();
  }


  return (
    <div className='create'>

      <h1>New game</h1>

      <form className='gameForm'>

        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={state.name}
          placeholder='name...'
          onChange={validate}
        />
        <div className='errorMessage'><span>{state.nameError}</span></div>

        <label htmlFor='image'>Image:</label>
        <input
          type='text'
          name='image'
          placeholder='image...'
          value={state.image}
          onChange={handleInputChange}
        />

        <label htmlFor='released'>Released:</label>
        <input
          type='text'
          name='released'
          value={state.released}
          placeholder='released...'
          onChange={validate}
        />
        <div className='errorMessage'><span>{state.releasedError}</span></div>

        <label htmlFor='rating'>Rating:</label>
        <input
          type='text'
          name='rating'
          value={state.rating}
          placeholder='rating...'
          onChange={validate}
        />
        <div className='errorMessage'><span>{state.ratingError}</span></div>

        <label htmlFor='description'>Description:</label>
        <textarea
          type='text'
          name='description'
          value={state.description}
          placeholder='description...'
          onChange={validate}
          cols='30'
          rows='6'
        />
        <div className='errorMessage'><span>{state.descriptionError}</span></div>

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
                    onClick={toggleGenre}
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
              value={state.otherGenre}
              onChange={handleInputChange}
            />
            <span className='add' onClick={addGenre}>Add</span>
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
                    onClick={togglePlatform}
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
                value={state.otherPlatform}
                onChange={handleInputChange}
              />
              <span className='add' onClick={addPlatform}>Add</span>
            </div>
            <span className='ok' onClick={hidePlatforms}>Ok</span>
            <div>
            </div>
          </div>
        </div>

        <input
          type='submit'
          value='Add game'
          onClick={submitPost}
        />
      </form>
      <NavLink className='floatingButton' to='/main'>
        <span>Back</span> 
      </NavLink>

      {state.message.length > 0 &&
        <div className='popupMessage' onClick={hideMessage}>
          <div>
            <span>x</span>
            <span>{state.message}</span>
          </div>
        </div>
      }
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
