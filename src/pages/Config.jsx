import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategory, getDifficulty, getQuestionType } from '../redux/actions/action';

class Config extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    this.setState({ categories: data.trivia_categories });
  };

  render() {
    const { dispatch } = this.props;
    const { categories } = this.state;
    return (
      <div>
        <Link to="/">
          olá
        </Link>
        <h1 data-testid="settings-title">Configurações</h1>
        <section>
          <label>
            Categoria
            <select
              onChange={ ({ target }) => dispatch(getCategory(target.value)) }
            >
              {categories.map((category) => (
                <option key={ category.id }>
                  {category.name}
                </option>))}
            </select>
          </label>
          <label>
            Dificuldade
            <select
              onChange={ ({ target }) => dispatch(getDifficulty(target.value)) }
            >
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
          </label>
          <label>
            Tipo
            <select
              onChange={ ({ target }) => dispatch(getQuestionType(target.value)) }
            >
              <option>multiple</option>
              <option>boolean</option>
            </select>
          </label>
        </section>
      </div>
    );
  }
}

Config.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Config);
