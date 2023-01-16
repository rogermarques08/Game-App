import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import logo from '../style/images/logo.png';
import '../style/Login.css';

const gravatar = require('gravatar');

function Login({ history }) {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    const getEmailUser = JSON.parse(localStorage.getItem('userEmail'));

    if (getEmailUser !== null) {
      history.push('/games');
    }
  });

  useEffect(() => {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const passwordLength = 7;
    const emailInput = regex
      .test(userData.email) && userData.password.length >= passwordLength;

    setIsDisabled(!emailInput);
  }, [userData]);

  const saveUserData = () => {
    localStorage.setItem('userEmail', JSON.stringify({
      userEmail: userData.email,
      userPicture: gravatar.url(userData.email, { protocol: 'https', s: '500' }),
    }));
    history.push('/games');
  };

  return (
    <form className="form-login-container scale-up-center">
      <div className="form-login">
        <img src={ logo } alt="logo" />
        <div className="inputs-container">
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={ handleChange }
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={ handleChange }
          />
          <button
            type="button"
            onClick={ saveUserData }
            disabled={ isDisabled }
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
