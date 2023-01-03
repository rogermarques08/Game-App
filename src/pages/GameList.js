import { useEffect, useState } from 'react';
import CardGame from '../components/CardGame';
import Header from '../components/Header';

function GameList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('gameList'));
    setList(getLocalStorage);
  }, []);

  return (
    <div>
      <Header />
      <CardGame games={ list } />
    </div>
  );
}

export default GameList;
