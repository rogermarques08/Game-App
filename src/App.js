import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameDetails from './pages/GameDetails';
import Main from './pages/Main';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Main } />
      <Route path="/game/:id" component={ GameDetails } />
    </Switch>
  );
}

export default App;
