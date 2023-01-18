import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import CardGame from '../components/CardGame';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import getData from '../helpers/getData';
import '../style/Main.css';

function Main() {
  const [games, setGames] = useState();
  const [loading, setIsLoading] = useState(false);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearch(value);
  };

  const searchGame = () => {
    const slug = search.replace(/ /g, '-').toLowerCase();
    const url = `https://api.rawg.io/api/games?search=${slug}?token&key=e338cac79cd8470c8b3c41797664aeb1`;
    setIsLoading(true);

    getData(url).then((searchResult) => {
      if (searchResult.results[0].name === 'Toren') {
        setSearch('');
        setIsLoading(false);
        return global.alert('Nenhum jogo foi encontrado!');
      }
      setGames(searchResult.results);
      setPrevious(searchResult.previous);
      setNext(searchResult.next);
      setSearch('');
      setIsLoading(false);
    });
  };

  const newGames = (endpoint) => {
    setIsLoading(true);
    getData(endpoint).then((gameData) => {
      setGames(gameData.results);
      setPrevious(gameData.previous);
      setNext(gameData.next);
    }).then(() => setIsLoading(false));
  };

  const getGames = () => {
    setIsLoading(true);
    const url = 'https://api.rawg.io/api/games?token&key=e338cac79cd8470c8b3c41797664aeb1';
    getData(url).then((gameData) => {
      setGames(gameData.results);
      setPrevious(gameData.previous);
      setNext(gameData.next);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getGames();
  }, [setGames]);

  const teste = () => ({
    teste: 'ok',
  });

  if (loading) {
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
    <div>
      <Header />
      <SearchBar
        search={ search }
        handleChange={ handleChange }
        searchGame={ searchGame }
        getGames={ getGames }
      />
      <main>
        <div className="card-game-container">
          <CardGame games={ games } { ...teste() } />
        </div>
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
        <Footer />
      </main>
    </div>
  );
}

export default Main;
