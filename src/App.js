import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameAchievements from './pages/GameAchievements';
import GameDetails from './pages/GameDetails';
import GameList from './pages/GameList';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game/:id" component={ GameDetails } />
      <Route path="/achievements/:id" component={ GameAchievements } />
      <Route path="/games" component={ Main } />
      <Route path="/list" component={ GameList } />
    </Switch>
  );
}

export default App;
