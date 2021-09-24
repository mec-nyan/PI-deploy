import './main.css';
import { NavLink } from 'react-router-dom';
import Card from '../card';
import Selector from '../selector';
import ArrowSelector from '../arrowSelector';


function MainPage() {

  return (
    <div className='main'>

      <div className='panel'>
        <div className='buttons'>
          <NavLink id='newgame' to='/main/create'>Add new game</NavLink>
        </div>
        <div className='buttons'>
          <Selector text='Order by:' options={['a-z', 'rating']} />
          <ArrowSelector />
          <Selector text='Filter by:' options={['genre', 'created by']} />
        </div>
      </div>

      <div className='mainView'>
        <Card genre={'Action, RPG'} rating='1.4' />
        <Card genre={'Action'} rating='1.4' />
        <Card genre={'Action, RPG, Adventure'} rating='1.4' />
        <Card genre={'Action, Romance'} rating='1.4' />
        <Card genre={'Action, RPG'} rating='1.4' />
        <Card genre={'Action, Indie'} rating='1.4' />
        <Card genre={'Action, RPG'} rating='1.4' />
        <Card genre={'Action, RPG'} rating='1.4' />
      </div>

    </div> 
  );
}


export default MainPage;
