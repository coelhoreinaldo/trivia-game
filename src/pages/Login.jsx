import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmail } from '../redux/actions/action';

const TOKEN_EXPIRED = 3;

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

  // Troquei o handleClick por handleAPI, mas se der algum conflito com os testes podemos voltar aqui
  handleAPI = async () => {
    const { email, name } = this.state;
    const { dispatch, history } = this.props;

    dispatch(getEmail(email, name));
    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((json) => {
        if (json.response_code === TOKEN_EXPIRED) {
          localStorage.removeItem('token');
          history.push('/');
        } else {
          localStorage.setItem('token', json.token);
        }
      });
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
          onClick={ this.handleAPI }
        >
          Play
        </button>
      </form>
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
