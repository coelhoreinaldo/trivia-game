import {
  GET_AMOUNT, GET_ASSERTIONS, GET_CATEGORY, GET_DIFFICULTY,
  GET_USER, INCREMENT_SCORE, RESET_SETTINGS, RESET_USER,
} from './typeActions';

export const getEmail = (email, name) => ({
  type: GET_USER,
  email,
  name,
});

export const incrementScore = (payload) => ({
  type: INCREMENT_SCORE,
  payload,
});

export const getAssertions = (assertions) => ({
  type: GET_ASSERTIONS,
  assertions,
});

export const resetUser = () => ({
  type: RESET_USER,
});

export const getCategory = (payload) => ({
  type: GET_CATEGORY,
  payload,
});

export const getDifficulty = (payload) => ({
  type: GET_DIFFICULTY,
  payload,
});

export const getAmount = (payload) => ({
  type: GET_AMOUNT,
  payload,
});

export const resetSettings = () => ({
  type: RESET_SETTINGS,
});
