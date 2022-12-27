import PropTypes from 'prop-types';
import { CgGames } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import '../style/SearchBar.css';

function SearchBar({ search, handleChange, searchGame, getGames }) {
  return (
    <div className="searchbar-container">
      <div>
        <input
          type="text"
          value={ search }
          placeholder="Search"
          onChange={ handleChange }
        />
        <span>
          <FiSearch onClick={ searchGame } />
        </span>
      </div>
      <button type="button" onClick={ getGames }>
        <CgGames />
        All Games
      </button>
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
