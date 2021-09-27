import './detail.css';
import { NavLink } from 'react-router-dom';
import artwork from './nierAutomata.jpg';
// >> Redux
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function GameDetail({ detail, getDetails }) {

  let { id } = useParams();

  useEffect(() => getDetails(id), []);
  
  let { name, description, released, rating, image, platforms, genres } = detail;

  return (
    <div className='detail'>

      <div className='bigCard'>


        <div className='image'>
          <img className='artwork' src={image} alt='' />

          <h1 className='gameTitle'>{name}</h1>

          <div className='rating'>
            <span>RATING</span>
            <span>{rating}</span>
          </div>
        </div>

        <div className='info'>
          <table>
            <tr className="title">
              <td>Released</td>
            </tr>
            <tr>
              <td>{released}</td>
            </tr>
            <tr className="title">
              <td>Genre</td>
            </tr>
            {genres.map( g => (<tr><td>{g}</td></tr>))}
            <tr className="title">
              <td>Platforms</td>
            </tr>
            {platforms.map( p => (<tr><td>{p}</td></tr>))}
          </table>
          <div className='description'>
            {description}
          </div>
        </div>

      </div>

      <NavLink className='floatingButton' to='/main'>
        <span>Back</span>
      </NavLink>

    </div> 
  );
}

function mapStateToProps(state) {
  return {
    detail: state.detail,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
