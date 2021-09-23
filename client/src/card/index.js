import './card.css';
import example from './img/nierAutomata.jpg';
import { NavLink } from 'react-router-dom';


function Card({ genre, rating }) {

  return (
    <div className='card'>

      <h3>Nier Automata</h3>

      <img src={example} alt='' />

      <table className='data'>
        <tr>
          <td>Rating:</td>
          <td id='rating'>{rating}</td>
        </tr>
        <tr>
          <td>Genre:</td>
          <td>{genre}</td>
        </tr>
      </table>

      <NavLink className='more 'to='/main/detail'>
        <span>more</span>
      </NavLink>
    </div>
  );
}

export default Card;
