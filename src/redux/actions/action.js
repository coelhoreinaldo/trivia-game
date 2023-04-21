import { GET_ASSERTIONS, GET_USER, INCREMENT_SCORE, RESET_USER } from './typeActions';

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
