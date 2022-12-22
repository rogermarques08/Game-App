import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useParams } from 'react-router-dom';
import getData from '../helpers/getData';

function GameDetails() {
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [screenShots, setScreenShots] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const gameUrl = `https://api.rawg.io/api/games/${id}?token&key=e338cac79cd8470c8b3c41797664aeb1`;
    const screenShotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?token&key=e338cac79cd8470c8b3c41797664aeb1`;

    getData(gameUrl).then((gameData) => {
      setGame(gameData);
    });

    getData(screenShotsUrl).then((gameScreen) => {
      setScreenShots(gameScreen.results);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <h1>carregando...</h1>;
  return (
    <div>
      <img src={ game.background_image } alt={ game.name } style={ { width: '400px' } } />
      <h1>{game.name}</h1>
      {/* <p>{game?.developers[0].name}</p> */}
      {game.description_raw}
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
  );
}

export default GameDetails;
