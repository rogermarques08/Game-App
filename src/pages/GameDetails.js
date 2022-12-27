import { useEffect, useState } from 'react';
import { FaPlaystation, FaWindows, FaXbox } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useParams } from 'react-router-dom';
import getData from '../helpers/getData';
import '../style/GameDetails.css';

function GameDetails() {
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [screenShots, setScreenShots] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [inList, setInList] = useState(false);

  const { id } = useParams();

  const getIcon = (platform) => {
    switch (platform) {
    case 'Xbox':
      return <FaXbox />;
    case 'PC':
      return <FaWindows />;
    case 'PlayStation':
      return <FaPlaystation />;
    case 'Nintendo':
      return <SiNintendoswitch />;
    default:
      break;
    }
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
  }, [id]);

  if (isLoading) return <h1>carregando...</h1>;

  return (
    <>
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
              type="button"
              onClick={ addToList }
            >
              {inList ? 'Remove game to list' : 'Add game to list' }

            </button>
          </div>
        </div>
        <hr />
        <div>
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
          <p>
            Achievements :
            {' '}
            {game.parent_achievements_count}
          </p>
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
        <div>
          <hr />
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
      </div>
    </>

  );
}

export default GameDetails;
