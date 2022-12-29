import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { FaListUl } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import getData from '../helpers/getData';
import '../style/GameAchievements.css';

function GameAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);

  const { id } = useParams();
  const history = useHistory();

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
    <div className="achievements-container">
      <header className="header-details" style={ { position: 'unset' } }>
        <span><BiArrowBack onClick={ () => history.push(`/game/${id}`) } /></span>
        <button type="button" onClick={ () => history.push('/list') }>
          <FaListUl />
          {' '}
          Game List
        </button>
      </header>
      <h1>Achieviments</h1>
      <ul className="achievements-list">
        {achievements.map((item) => (
          <li key={ item.id } className="scale-up-center">
            <img src={ item.image } alt={ item.name } />
            <div>
              <p className="acvmts-title">{item.name}</p>
              <p className="desc">{item.description}</p>
              <p className="percent">{`${item.percent}% of players unlock`}</p>
            </div>
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
