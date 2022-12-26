import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const passwordLength = 7;
    const emailInput = regex
      .test(userData.email) && userData.password.length >= passwordLength;

    setIsDisabled(!emailInput);
  }, [userData]);

  const saveUserData = () => {
    history.push('/games');
  };

  return (
    <div>
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
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
