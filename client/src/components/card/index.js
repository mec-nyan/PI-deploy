import './card.css';
import { NavLink } from 'react-router-dom';


function Card({ title, genres, rating, background }) {

  return (
    <div className='card'>

      <h3>{title}</h3>

      <img src={background} alt='' />

      <table className='data'>
        <tr>
          <td>Rating:</td>
          <td id='rating'>{rating}</td>
        </tr>
        <tr>
          <td>Genre:</td>
          <td>{genres}</td>
        </tr>
      </table>

      <NavLink className='more 'to='/main/detail'>
        <span>more</span>
      </NavLink>
    </div>
  );
}

export default Card;
