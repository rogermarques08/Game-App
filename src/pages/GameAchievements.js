/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineUser
} from 'react-icons/ai';
import { BiArrowBack, BiLogOut } from 'react-icons/bi';
import { Link, useHistory, useParams } from 'react-router-dom';
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

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32" />
          </svg>
        </div>

        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72" />
          </svg>
        </div>

        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="achievements-container">
      <header className="header-details">
        <nav style={ { background: '#1B1B1B' } }>
          <span
            style={ { color: '#677def' } }
          >
            <BiArrowBack onClick={ () => history.push(`/game/${id}`) } />
          </span>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <span style={ { color: '#677def' } }><AiOutlineUnorderedList /></span>
          </label>
          <ul className="scale-up-tr">
            <Link to="/games">
              <li>
                {' '}
                <AiOutlineHome />
                {' '}
                Home
              </li>
            </Link>
            <Link to="/list">
              <li>
                {' '}
                <AiOutlineHeart />
                {' '}
                Game list
              </li>
            </Link>
            <Link to="/profile">
              <li>
                {' '}
                <AiOutlineUser />
                {' '}
                Profile
              </li>
            </Link>
            <Link to="/">
              <li>
                {' '}
                <BiLogOut />
                {' '}
                Log Out
              </li>
            </Link>
          </ul>
        </nav>
      </header>
      <ul className="achievements-list">
        <h1>Achieviments</h1>
        <div className="acvmts">
          {achievements.map((item) => (
            <li key={ item.id } className="scale-up-center">
              <img src={ item.image } alt={ item.name } />
              <div className="achievements-infos">
                <p className="acvmts-title">{item.name}</p>
                <p className="desc">{item.description}</p>
                <p className="percent">{`${item.percent}% of players unlock`}</p>
              </div>
            </li>
          ))}
        </div>
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
