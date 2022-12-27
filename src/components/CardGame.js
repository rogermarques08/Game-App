import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/CardGame.css';

function CardGame({ games }) {
  const getColor = (rating) => {
    const goodRating = 4.20;
    const mediumRating = 3.20;
    if (rating > goodRating) return { color: 'green', border: 'solid 1px green' };
    if (rating > mediumRating) return { color: 'yellow', border: 'solid 1px yellow' };
    return { color: 'red', border: 'solid 1px red' };
  };

  return (
    <div className="card-game-container">
      {games?.map((game, index) => (
        <Link to={ `/game/${game.id}` } key={ index }>
          <div className="card-game">
            <img
              src={ game.background_image }
              alt={ game.name }
            />
            <div>
              <h2>{game.name}</h2>
              <div className="game-info">
                <p style={ getColor(game.rating) } className="rating">{game.rating}</p>
                <p>
                  {game.genres.slice(0, 2).map((item) => item.name).join()}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

CardGame.defaultProps = {
  games: undefined,
};

CardGame.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})),
};

export default CardGame;
