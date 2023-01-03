import { useEffect, useState } from 'react';
import CardGame from '../components/CardGame';
import Header from '../components/Header';
import '../style/GameList.css';

function GameList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('gameList'));
    setList(getLocalStorage);
  }, []);

  return (
    <div>
      <Header />
      <div className="list-container">
        <CardGame games={ list } />
      </div>
    </div>
  );
}

export default GameList;
