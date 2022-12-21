import { useEffect, useState } from 'react';
import getData from '../helpers/getData';

function Main() {
  const [games, setGames] = useState();

  useEffect(() => {
    const url = 'https://api.rawg.io/api/games?token&key=e338cac79cd8470c8b3c41797664aeb1';
    getData(url).then((gameData) => setGames(gameData.results));
  }, [setGames]);

  return (
    <p>Main</p>
  );
}

export default Main;
