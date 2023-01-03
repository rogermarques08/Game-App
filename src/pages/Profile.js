import { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import '../style/Profile.css';

function Profile() {
  const [userInfos, setUserInfos] = useState({});

  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem('userEmail');
    history.push('/');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userEmail'));
    setUserInfos(userData);
  }, []);

  return (
    <div>
      <Header />
      <div className="user-infos">
        <img src={ userInfos.userPicture } alt="user" />
        <p>{userInfos.userEmail}</p>
        <button type="button" onClick={ logOut }>
          {' '}
          <BiLogOut />
          {' '}
          Log Out

        </button>
      </div>
    </div>
  );
}

export default Profile;
