import './card.css';
import example from './img/nierAutomata.jpg';
import { NavLink } from 'react-router-dom';


function Card() {

  return (
    <div className='card'>

      <img src={example} alt='' />

      <h2>Nier Automata</h2>
      <p>Some text</p>

    </div>
  );
}

export default Card;
