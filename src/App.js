import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Main } />
    </Switch>
  );
}

export default App;
