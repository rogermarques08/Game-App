import { useEffect, useState } from 'react';
import CardGame from '../components/CardGame';

function GameList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('gameList'));
    setList(getLocalStorage);
  }, []);

  return (
    <div>
      <h1>Game List</h1>
      <CardGame games={ list } />
    </div>
  );
}

export default GameList;
