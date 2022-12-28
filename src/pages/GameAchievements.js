import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import getData from '../helpers/getData';

function GameAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);

  const { id } = useParams();

  const newGames = (endpoint) => {
    setIsLoading(true);
    getData(endpoint).then((gameData) => {
      setAchievements(gameData.results);
      setPrevious(gameData.previous);
      setNext(gameData.next);
    }).then(() => setIsLoading(false));
  };

  useEffect(() => {
    const url = `https://api.rawg.io/api/games/${id}/achievements?page_size=30&token&key=e338cac79cd8470c8b3c41797664aeb1`;
    setIsLoading(true);
    getData(url).then((data) => {
      setAchievements(data.results);
      setPrevious(data.previous);
      setNext(data.next);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <p>carregando...</p>;

  return (
    <div>
      <h1>Achievements</h1>
      <ul>
        {achievements.map((item) => (
          <li key={ item.id }>
            <img src={ item.image } alt={ item.name } />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{`${item.percent}%`}</p>
          </li>
        ))}
      </ul>
      <div className="buttons-container">
        <button
          type="button"
          disabled={ previous === null }
          onClick={ () => newGames(previous) }
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          type="button"
          disabled={ next === null }
          onClick={ () => newGames(next) }
        >
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
}

export default GameAchievements;
