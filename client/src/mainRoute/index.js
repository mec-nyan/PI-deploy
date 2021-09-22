import './main.css';
import { NavLink } from 'react-router-dom';


function MainPage() {

  return (
    <div className='main'>
      <h1>Main Page</h1>
      <NavLink to='/'>
        <button>Back</button>
      </NavLink>
    </div> 
  );
}


export default MainPage;
