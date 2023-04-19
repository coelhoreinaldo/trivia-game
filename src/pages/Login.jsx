import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getEmail } from '../redux/actions/action';

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

  handleClick = () => {
    const { email, name } = this.state;
    const { dispatch } = this.props;
    console.log(email);
    dispatch(getEmail(email, name));
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
          data-testid="input-player-name"
        >
          Nome
          <input
            type="text"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            type="submit"
            disabled={ !name || !email }
            data-testid="btn-play"
            onClick={ () => this.handleClick() }
          >
            Play
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
