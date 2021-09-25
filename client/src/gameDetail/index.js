import './detail.css';
import { NavLink } from 'react-router-dom';
import artwork from './nierAutomata.jpg';


function GameDetail() {
  
  let name = 'NieR:Automata';
  let description = <p>NieR: Automata is an action RPG, a sequel to Nier and a spin-off to the Drakenguard series. The story is set in the middle of the war between humans and machines where you take on the role of an android warrior called 2B. The story develops around the theme of androids&#39; ability to feel and make their own decisions.<br /><br /> The gameplay of NieR: Automata combines RPG elements, such as character progression, with action-based combat and some platforming features, including climbing and jumping over obstacles. Except for traditional light and heavy attacks, there are quick time events that if the completed result in a highly damaging counterattack. You can use four weapon types during the battles: short swords, long swords, bracers, and spears. While you play as a robot, you can upgrade your body with special chips that increase your stats. <br /><br /> The game is set in an open world and features numerous NPCs and side quests. You can explore it on foot as well as ride a wild animal or pilot a flying mech. There are also shops where you can get useful items including potions to restore health.</p>;

  return (
    <div className='detail'>

      <div className='bigCard'>

        <h1 className='gameTitle'>{name}</h1>

        <img className='artwork' src={artwork} alt='' />

        <div className='description'>
          {description}
        </div>
      </div>

      <NavLink className='floatingButton' to='/main'>
        <span>Back</span>
      </NavLink>

    </div> 
  );
}


export default GameDetail;
