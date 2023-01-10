/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-max-depth */
import { useEffect, useState } from 'react';
import {
  AiFillHeart, AiOutlineHeart,
  AiOutlineHome, AiOutlineUnorderedList,
  AiOutlineUser
} from 'react-icons/ai';
import { BiArrowBack, BiLogOut } from 'react-icons/bi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Link, useHistory, useParams } from 'react-router-dom';
import CardGame from '../components/CardGame';
import getData from '../helpers/getData';
import getIcon from '../helpers/getIcon';
import { getNameStore, getStores } from '../helpers/getStores';
import '../style/GameDetails.css';

function GameDetails() {
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [screenShots, setScreenShots] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [inList, setInList] = useState(false);
  const [gameSeries, setGameSeries] = useState([]);
  const [stores, setGameStores] = useState([]);

  const { id } = useParams();
  const history = useHistory();

  const seeAchievements = () => {
    history.push(`/achievements/${id}`);
  };

  const addToList = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('gameList'));

    if (!getLocalStorage) {
      localStorage.setItem('gameList', JSON.stringify([game]));
    } else {
      const isInList = getLocalStorage.some((item) => item.id === game.id);

      if (isInList) {
        const filterdList = getLocalStorage.filter((item) => item.id !== game.id);
        localStorage.setItem('gameList', JSON
          .stringify(filterdList));
        setInList(false);
      } else {
        localStorage.setItem('gameList', JSON.stringify([...getLocalStorage, game]));
        setInList(true);
      }
    }
  };

  useEffect(() => {
    const gameUrl = `https://api.rawg.io/api/games/${id}?token&key=e338cac79cd8470c8b3c41797664aeb1`;
    const screenShotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?token&key=e338cac79cd8470c8b3c41797664aeb1`;
    const sameSeriesUrl = `https://api.rawg.io/api/games/${id}/game-series?token&key=e338cac79cd8470c8b3c41797664aeb1`;
    const storesUrl = `https://api.rawg.io/api/games/${id}/stores?token&key=e338cac79cd8470c8b3c41797664aeb1`;

    getData(gameUrl).then((gameData) => {
      setGame(gameData);

      const getPlataforms = gameData.parent_platforms
        .filter((item) => item.platform.name === 'PC'
    || item.platform.name === 'Xbox'
    || item.platform.name === 'PlayStation'
    || item.platform.name === 'Nintendo');
      setPlatforms(getPlataforms);

      const getLocalStorage = JSON.parse(localStorage.getItem('gameList'));
      const isInList = getLocalStorage?.some((item) => item.id === gameData.id);
      setInList(isInList);
    });

    getData(screenShotsUrl).then((gameScreen) => {
      setScreenShots(gameScreen.results);
      setIsLoading(false);
    });

    getData(sameSeriesUrl).then((gameDataSeries) => {
      setGameSeries(gameDataSeries.results);
      setIsLoading(false);
    });

    getData(storesUrl).then((gameDataStores) => {
      setGameStores(gameDataStores.results.filter((store) => store.store_id === 1
      || store.store_id === 7
      || store.store_id === 11
      || store.store_id === 3));
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
    <div className="scale-up-center">
      <header className="header-details">
        <nav>
          <span><BiArrowBack onClick={ () => history.push('/games') } /></span>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <span><AiOutlineUnorderedList /></span>
          </label>
          <ul className="scale-up-tr navbar-dtl">
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
      <img src={ game.background_image } alt={ game.name } className="game-img" />
      <div className="game-details-container">
        <div className="game-id">
          <h2>{game.name}</h2>
          <h4>{game.developers?.[0].name}</h4>
          <div>
            <div>
              {platforms.map((platform) => (
                <span key={ platform.platform.name }>
                  { getIcon(platform.platform.name)}
                </span>
              ))}
            </div>
            <button
              className="fav"
              type="button"
              onClick={ addToList }
            >
              {inList ? <AiFillHeart /> : <AiOutlineHeart /> }

            </button>
          </div>
        </div>
        <hr />
        <div className="game-details">
          <h3>Game Info</h3>
          <p>
            Metacritic :
            {' '}
            {game.metacritic}
          </p>
          <p>
            Release date of :
            {' '}
            {game.released}

          </p>
          <p>
            Playtime :
            {' '}
            {game.playtime}
            h
          </p>
          <div>
            <p>
              Achievements :
              {' '}
              {game.parent_achievements_count}
            </p>
            <button
              type="button"
              onClick={ seeAchievements }
              className="acvmts-btn"
            >
              View all achievements

            </button>
          </div>
          <p>
            Genres:
            {' '}
            {game.genres?.map((item) => item.name).join()}
          </p>
          <p>
            Classification :
            {' '}
            {game.esrb_rating?.name}
          </p>
        </div>
        <hr />
        <div>
          <h3>Description</h3>
          {game.description_raw}
        </div>
        <hr />
        <div>
          <h3>Media</h3>
          <Carousel
            emulateTouch
            infiniteLoop
            swipeable
            showStatus={ false }
            showArrows={ false }
            autoPlay
          >
            {screenShots.map((screenShot) => (
              <div key={ screenShot.image }>
                <img src={ screenShot.image } alt="game screenShot" />
              </div>
            ))}
          </Carousel>
          {/* Carousel : https://www.npmjs.com/package/react-responsive-carousel?activeTab=readme */}
        </div>
        <hr />
        <div>
          <h3>Stores</h3>
          <div className="stores-container">
            {stores.map((idStore) => (
              <a
                href={ idStore.url }
                key={ idStore.store_id }
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  {getStores(idStore.store_id)}
                  Buy on
                  {' '}
                  {getNameStore(idStore.store_id)}
                </span>
              </a>
            ))}
          </div>
        </div>
        <hr />
        <div>
          <h3>Related</h3>
          <div className="related-container">
            <CardGame games={ gameSeries } />
          </div>
        </div>
      </div>
    </div>

  );
}

export default GameDetails;
