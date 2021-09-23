import './card.css';
import example from './img/nierAutomata.jpg';
import { NavLink } from 'react-router-dom';


function Card() {

  return (
    <div className='card'>

      <h3>Nier Automata</h3>

      <img src={example} alt='' />

      <p>Some text</p>

    </div>
  );
}

export default Card;
