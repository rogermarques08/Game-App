import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getData from '../helpers/getData';

function Main() {
  const [games, setGames] = useState();
  const [loading, setIsLoading] = useState(true);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);

  const newGames = (endpoint) => {
    setIsLoading(true);
    getData(endpoint).then((gameData) => {
      setGames(gameData.results);
      setPrevious(gameData.previous);
      setNext(gameData.next);
    }).then(() => setIsLoading(false));
  };

  useEffect(() => {
    const url = 'https://api.rawg.io/api/games?token&key=e338cac79cd8470c8b3c41797664aeb1';
    getData(url).then((gameData) => {
      setGames(gameData.results);
      setIsLoading(false);
      setPrevious(gameData.previous);
      setNext(gameData.next);
    });
  }, [setGames]);

  if (loading) return <p>carregando...</p>;

  return (
    <div>
      <h1>Games</h1>
      <main>
        <div>
          {games?.map((game, index) => (
            <Link to={ `/game/${game.id}` } key={ index }>
              <div>
                <img
                  src={ game.background_image }
                  alt={ game.name }
                  style={ { maxWidth: '200px' } }
                />
                <h2>{game.name}</h2>
                <p>{game.rating}</p>
                {game.genres.slice(0, 2).map((genre) => (
                  <p key={ genre.id }>{genre.name}</p>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div>
          <button
            type="button"
            disabled={ previous === null }
            onClick={ () => newGames(previous) }
          >
            Previous
          </button>
          <button
            type="button"
            disabled={ next === null }
            onClick={ () => newGames(next) }
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default Main;
