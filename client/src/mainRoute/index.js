import './main.css';
import { NavLink } from 'react-router-dom';
import SideBar from '../sideBar';
import Card from '../card';


function MainPage() {

  return (
    <div className='main'>

      <div className='buttons'>
        <div className='selector'>Order by: Name</div>
        <div className='selector'>Ascendent</div>
        <div className='selector'>Filter</div>
      </div>

      <div className='cards'>
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
