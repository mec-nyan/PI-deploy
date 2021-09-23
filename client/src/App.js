import './App.css';
import Home from './homePage';
import Main from './mainRoute';
import Details from './gameDetail';
import Create from './createGame';
import SearchBar from './searchBar';
import SideBar from './sideBar';
import Footer from './footer';
import { Switch, Route, Fade } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/main'>
        <SearchBar />
        <div className='content'>
          <SideBar />

          <Route exact path='/main'>
            <Main />
          </Route> 

          <Route exact path='/main/detail'>
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
