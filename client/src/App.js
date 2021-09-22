import './App.css';
import Home from './homePage';
import Main from './mainRoute';
import Details from './gameDetail';
import Create from './createGame';
import SearchBar from './searchBar';
import { Switch, Route, Fade } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/main'>
        <SearchBar />
      </Route>

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
  );
}

export default App;
