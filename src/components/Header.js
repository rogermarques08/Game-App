/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineUser
} from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';
import '../style/Header.css';
import box from '../style/images/box.png';

function Header() {
  // const [userInfos, setUserInfos] = useState({});

  const history = useHistory();

  // useEffect(() => {
  //   const getUserData = JSON.parse(localStorage.getItem('userEmail'));
  //   setUserInfos(getUserData);
  // }, []);

  const logOut = () => {
    localStorage.removeItem('userEmail');
    history.push('/');
  };

  return (
    <header className="header-container">
      <nav>
        <Link to="/games" style={ { textDecoration: 'none' } }>
          <div className="logo">
            <img src={ box } alt="logo" className="bounce-in-top" />
            <span>GAME BOX</span>
          </div>
        </Link>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <span style={ { color: '#677def' } }><AiOutlineUnorderedList /></span>
        </label>
        <ul className="scale-up-tr navbar">
          <Link to="/games">
            <li>
              {' '}
              <AiOutlineHome />
              {' '}
              Home
            </li>
          </Link>
          <Link to="list">
            <li>
              {' '}
              <AiOutlineHeart />
              {' '}
              Game list
            </li>
          </Link>
          <Link to="profile">
            <li>
              {' '}
              <AiOutlineUser />
              {' '}
              Profile
            </li>
          </Link>
          <li>
            <button type="button" onClick={ logOut }>
              {' '}
              <BiLogOut />
              {' '}
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
