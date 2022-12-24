import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameDetails from './pages/GameDetails';
import GameList from './pages/GameList';
import Main from './pages/Main';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Main } />
      <Route path="/game/:id" component={ GameDetails } />
      <Route path="/list" component={ GameList } />
    </Switch>
  );
}

export default App;
