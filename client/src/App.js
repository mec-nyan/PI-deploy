import './App.css';
import Home from './homePage';
import Main from './mainRoute';
import Details from './gameDetail';
import Create from './createGame';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/main'>
        <Main />
      </Route> 

      <Route exact path='/detail'>
        <Details />
      </Route> 

      <Route exact path='/create'>
        <Create />
      </Route> 

    <Home />
    </Switch>
  );
}

export default App;
