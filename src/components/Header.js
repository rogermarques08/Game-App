import { FaListUl } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import '../style/Header.css';

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
        <h1>Games APP</h1>
      </Link>
      {/* <div className="user-infos">
        <p>{userInfos.userEmail}</p>
        <img src={ userInfos.userPicture } alt="user" />
      </div> */}
      <button type="button" onClick={ () => history.push('/list') }>
        <FaListUl />
        {' '}
        Game List
      </button>
    </header>
  );
}

export default Header;
