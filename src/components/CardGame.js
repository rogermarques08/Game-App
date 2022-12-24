import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardGame({ games }) {
  return (
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
  );
}

CardGame.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CardGame;
