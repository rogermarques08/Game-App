import { FaListUl } from 'react-icons/fa';
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

  return (
    <header className="header-container">
      <Link to="/games">
        <div className="logo">
          <img src={ box } alt="logo" className="bounce-in-top" />
          <span>GAME BOX</span>
        </div>
      </Link>
      {/* <div className="user-infos">
        <p>{userInfos.userEmail}</p>
        <img src={ userInfos.userPicture } alt="user" />
      </div> */}
      <button type="button" onClick={ () => history.push('/list') }>
        <span>
          <FaListUl />
        </span>
        {' '}
        Game List
      </button>
    </header>
  );
}

export default Header;
