import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleClick = async () => {
    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((json) => localStorage.setItem('token', json.token));
    const { history } = this.props;
    history.push('/game');
  };

  handleConfigButton = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { email, name } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="">
          Email
          <input
            type="email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label
          htmlFor=""
        >
          Nome
          <input
            type="text"
            value={ name }
            name="name"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfigButton }
        >
          Configuração

        </button>
        <button
          type="submit"
          disabled={ !name || !email }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
