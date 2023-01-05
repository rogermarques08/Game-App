/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';

import { Link } from 'react-router-dom';
import getIcon from '../helpers/getIcon';
import '../style/CardGame.css';

function CardGame({ games }) {
  return (
    <div className="card-game-container">
      {games?.map((game, index) => (
        <Link to={ `/game/${game.id}` } key={ index }>
          <div className="card-game">
            <img
              src={ game.background_image }
              alt={ game.name }
            />
            <div className="game-info-container">
              <div className="platforms">
                {game.parent_platforms.map((item) => (
                  <span key={ item.platform.name }>{getIcon(item.platform.name)}</span>
                ))}
              </div>
              <h3>{game.name}</h3>
              <div className="game-info">
                <div className="stars">
                  <ReactStars
                    count={ 5 }
                    size={ 18 }
                    color="gray"
                    activeColor="white"
                    edit={ false }
                    value={ +game.rating }
                    isHalf
                  />
                  <span className="rating">
                    {game.rating}
                  </span>
                </div>
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
