import './detail.css';
import { NavLink } from 'react-router-dom';
// >> Redux
import * as actionCreators from '../../actions';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../actions';



function GameDetail({ detail, loadingDetails, getDetails }) {

  let { id } = useParams();

  useEffect(() => console.log('wtf'));
  useEffect(() => getDetails(id), []);
  

  if (loadingDetails) {
    console.log(loadingDetails);
    return <h1>Loading...</h1>;
  } else {
    console.log(loadingDetails);

    let { name, description, released, rating, image, platforms, genres } = detail;
    if (description) {
      description = description.replaceAll('<p>', '').replaceAll('</p>', '').split('<br />');
      return (
        <>
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
                <tbody>
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
                </tbody>
              </table>
              <div className='description'>
                {description.map( d => (<><p>{d}</p><br /><br /></>) )}
              </div>
            </div>
          </div>
          <NavLink className='floatingButton' to='/main'>
            <span>Back</span>
          </NavLink>
        </div> 
        </>
      );
    } else {
      return <h1>Not found</h1>
    }
  }
}

function mapStateToProps(state) {
  return {
    detail: state.detail,
    loadingDetails: state.loadingDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
