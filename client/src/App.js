import './App.css';
import Home from './components/homePage';
import Main from './components/mainRoute';
import Details from './components/gameDetail';
import Create from './components/createGame';
import SearchBar from './components/searchBar';
import SideBar from './components/sideBar';
import Footer from './components/footer';
import logo from './img/logoMecFull.png';
import { Route, NavLink } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/main'>
        <SearchBar />

        <NavLink to='/'>
          <img id='logo' src={logo} alt='MEC' />
        </NavLink>

        <div className='content'>
          <SideBar />

          <Route exact path='/main'>
            <Main />
          </Route> 

          <Route exact path='/main/detail/:id'>
            <Details />
          </Route>


          <Route exact path='/main/create'>
            <Create />
          </Route> 
        </div>
        <Footer />
      </Route>
    </div>
  );
}

export default App;
