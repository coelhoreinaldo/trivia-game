import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategory, getDifficulty, getQuestionType,
  resetSettings } from '../redux/actions/action';
import './Config.css';

class Config extends Component {
  state = {
    categories: [],
    selectedCategory: 'General Knowledge',
    selectedDifficulty: 'easy',
    selectedType: 'multiple',
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    this.setState({ categories: data.trivia_categories });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    const { history } = this.props;
    event.preventDefault();
    const { selectedCategory, selectedDifficulty, selectedType, categories } = this.state;
    const { dispatch } = this.props;
    const findId = categories.find((category) => category.name === selectedCategory);
    dispatch(getCategory(findId.id));
    dispatch(getDifficulty(selectedDifficulty));
    dispatch(getQuestionType(selectedType));

    history.push('/');
  };

  handleLeave = () => {
    const { history, dispatch } = this.props;

    dispatch(resetSettings());

    history.push('/');
  };

  render() {
    const { categories, selectedCategory, selectedDifficulty, selectedType } = this.state;
    return (
      <div className="form-container config-container">
        <form
          onSubmit={ this.handleSubmit }
          onReset={ this.handleLeave }
          className="form"
        >
          <h1 data-testid="settings-title">Settings</h1>
          <label>
            Category
            <select
              onChange={ this.handleChange }
              name="selectedCategory"
              value={ selectedCategory }
            >
              {categories.map((category) => (
                <option key={ category.id }>
                  {category.name}
                </option>))}
            </select>
          </label>
          <div className="select-container">
            <label htmlFor="difficulty">
              Difficulty
            </label>
            <select
              onChange={ this.handleChange }
              name="selectedDifficulty"
              value={ selectedDifficulty }
              id="difficulty"
            >
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
            <label htmlFor="type">
              Type
            </label>
            <select
              onChange={ this.handleChange }
              name="selectedType"
              value={ selectedType }
              id="type"
            >
              <option>multiple</option>
              <option>boolean</option>
            </select>

          </div>
          <section className="buttons-container">
            <button className="button-64" type="submit">
              <span>Save</span>
            </button>
            <button className="button-64" type="reset">
              <span>Reset</span>
            </button>
          </section>
        </form>
      </div>
    );
  }
}

Config.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Config);
