import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const [userInfos, setUserInfos] = useState({});

  const history = useHistory();

  useEffect(() => {
    const getUserData = JSON.parse(localStorage.getItem('userEmail'));
    setUserInfos(getUserData);
  }, []);

  return (
    <header>
      <Link to="/games">
        <h1>Games APP</h1>
      </Link>
      <p>{userInfos.userEmail}</p>
      <img src={ userInfos.userPicture } alt="user" />
      <button type="button" onClick={ () => history.push('/list') }>Game List</button>
    </header>
  );
}

export default Header;
