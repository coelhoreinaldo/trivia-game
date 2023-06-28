import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getAmount, getCategory,
  getDifficulty, resetSettings } from '../redux/actions/action';
import './Config.css';

function Config({ history }) {
  const [categories, setCategories] = useState([]);
  const [config, setConfig] = useState({
    selectedCategory: 0,
    selectedDifficulty: '',
    selectedAmount: 5,
  });
  const { selectedCategory, selectedDifficulty, selectedAmount } = config;
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    setCategories(data.trivia_categories);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    let category = selectedCategory;
    if (selectedCategory !== 0) {
      category = categories.find((item) => item.name === selectedCategory).id;
    }
    dispatch(getCategory(category));
    dispatch(getDifficulty(selectedDifficulty));
    dispatch(getAmount(Number(selectedAmount)));

    history.push('/');
  }, [categories,
    dispatch,
    history,
    selectedAmount,
    selectedCategory,
    selectedDifficulty]);

  const handleLeave = () => {
    dispatch(resetSettings());
    history.push('/');
  };

  return (
    <div className="form-container config-container">
      <form
        onSubmit={ handleSubmit }
        onReset={ handleLeave }
        className="form"
      >
        <h1 data-testid="settings-title" className="settings-title">Settings</h1>
        <div className="select-container">

          <label htmlFor="selectedCategory">
            Category
          </label>
          <select
            onChange={ handleChange }
            name="selectedCategory"
            value={ selectedCategory }
            id="selectedCategory"
          >
            <option value={ 0 }>Any Category</option>
            {categories.map((category) => (
              <option key={ category.id }>
                {category.name}
              </option>))}
          </select>
        </div>
        <div className="select-container">

          <label htmlFor="difficulty">
            Difficulty
          </label>
          <select
            onChange={ handleChange }
            name="selectedDifficulty"
            value={ selectedDifficulty }
            id="difficulty"
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="select-container">

          <label htmlFor="amount">
            Amount
          </label>
          <select
            onChange={ handleChange }
            name="selectedAmount"
            value={ selectedAmount }
            id="amount"
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
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

Config.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Config;
