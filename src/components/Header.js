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
import { Link } from 'react-router-dom';
import '../style/Header.css';
import box from '../style/images/box.png';

function Header() {
  // const [userInfos, setUserInfos] = useState({});

  // const history = useHistory();

  // useEffect(() => {
  //   const getUserData = JSON.parse(localStorage.getItem('userEmail'));
  //   setUserInfos(getUserData);
  // }, []);

  return (
    <header className="header-container">
      <nav>
        <div className="logo">
          <img src={ box } alt="logo" className="bounce-in-top" />
          <span>GAME BOX</span>
        </div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <span><AiOutlineUnorderedList /></span>
        </label>
        <ul>
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
              Perfil
            </li>
          </Link>
          <Link to="/">
            <li>
              {' '}
              <BiLogOut />
              {' '}
              Log Out
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
