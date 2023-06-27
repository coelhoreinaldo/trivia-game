import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail } from '../redux/actions/action';
import './Login.css';
import logo from '../trivia.png';
import Footer from '../components/Footer';

function Login({ history }) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAPI = async () => {
    try {
      dispatch(getEmail(formData.email, formData.fullName));
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      localStorage.setItem('token', data.token);
      history.push('/game');
    } catch (error) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAPI();
    setLoading(true);
  };

  const handleConfigButton = () => {
    history.push('/config');
  };

  return (
    <div className="form-container login-container">
      <form className="form" onSubmit={ handleSubmit }>
        <img src={ logo } alt="logo" className="trivia-logo" />
        <div className="input-container">
          <input
            id="email"
            className="input"
            type="email"
            value={ formData.email }
            name="email"
            onChange={ handleChange }
            data-testid="input-gravatar-email"
            placeholder="Qual é o seu email?"
          />
        </div>
        <div className="input-container">
          <input
            id="name"
            className="input"
            type="text"
            value={ formData.fullName }
            name="fullName"
            onChange={ handleChange }
            data-testid="input-player-name"
            placeholder="Qual é o seu nome?"
          />
        </div>
        <div className="buttons-container">
          <button
            className="button-64 btn-play"
            type="submit"
            disabled={ !formData.fullName || !formData.email || loading }
            data-testid="btn-play"
          >
            <span className="text">{loading ? '...' : 'Play'}</span>
          </button>
          <button
            className="button-64 btn-settings"
            type="button"
            data-testid="btn-settings"
            onClick={ handleConfigButton }
          >
            <span className="text">Settings</span>
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
