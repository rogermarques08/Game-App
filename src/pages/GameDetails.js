import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../helpers/getData';

function GameDetails() {
  const [game, setGame] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const url = `https://api.rawg.io/api/games/${id}?token&key=e338cac79cd8470c8b3c41797664aeb1`;
    getData(url).then((gameData) => {
      setGame(gameData);
      setIsLoading(false);
    });
  });

  if (isLoading) return <h1>carregando...</h1>;
  return (
    <div>
      <img src={ game.background_image } alt={ game.name } style={ { width: '400px' } } />
      <h1>{game.name}</h1>
      <p>{game.developers[0].name}</p>
      {game.description_raw}
    </div>
  );
}

export default GameDetails;
