import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
      userPicture: gravatar.url(userData.email, { protocol: 'https' }),
    }));
    history.push('/games');
  };

  return (
    <form className="form-login-container">
      <div className="form-login">
        <h1>Games App</h1>
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
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
