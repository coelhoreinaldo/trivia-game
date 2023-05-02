import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail } from '../redux/actions/action';
import './Login.css';
import logo from '../trivia.png';
import Footer from '../components/Footer';

// const TOKEN_EXPIRED = 3;

class Login extends Component {
  state = {
    email: '',
    name: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleAPI();
    this.setState({ loading: true });
  };

  handleAPI = async () => {
    const { email, name } = this.state;
    const { dispatch, history } = this.props;

    try {
      dispatch(getEmail(email, name));
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      localStorage.setItem('token', data.token);
      history.push('/game');
    } catch (error) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  handleConfigButton = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { email, name, loading } = this.state;
    return (
      <div className="form-container login-container">
        <form className="form" onSubmit={ this.handleSubmit }>
          <img src={ logo } alt="logo" className="trivia-logo" />
          <div className="input-container">
            <input
              id="email"
              className="input"
              type="email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              placeholder="Qual é o seu email?"
            />
          </div>
          <div className="input-container">
            <input
              id="name"
              className="input"
              type="text"
              value={ name }
              name="name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
              placeholder="Qual é o seu nome?"
            />
          </div>
          <div className="buttons-container">
            <button
              className="button-64 btn-play"
              type="submit"
              disabled={ !name || !email || loading }
              data-testid="btn-play"
            >
              <span className="text">
                {loading ? '...' : 'Play'}
              </span>
            </button>
            <button
              className="button-64 btn-settings"
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleConfigButton }
            >
              <span className="text">
                Settings
              </span>
            </button>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
