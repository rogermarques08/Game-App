import PropTypes from 'prop-types';

function SearchBar({ search, handleChange, searchGame, getGames }) {
  return (
    <div>
      <button type="button" onClick={ getGames }>
        Home
      </button>
      <input
        type="text"
        value={ search }
        placeholder="search"
        onChange={ handleChange }
      />
      <button type="button" onClick={ searchGame }>Search</button>
    </div>
  );
}

SearchBar.propTypes = {
  getGames: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  searchGame: PropTypes.func.isRequired,
};

export default SearchBar;
