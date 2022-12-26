import { useEffect, useState } from 'react';
import CardGame from '../components/CardGame';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import getData from '../helpers/getData';

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

  return (
    <div>
      <Header />
      <h1>Games</h1>
      <SearchBar
        search={ search }
        handleChange={ handleChange }
        searchGame={ searchGame }
        getGames={ getGames }
      />
      {loading ? (
        <p>carregando...</p>
      ) : (
        <main>
          <CardGame games={ games } />
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
      )}
    </div>
  );
}

export default Main;
