import { GET_USER, INCREMENT_SCORE } from './typeActions';

export const getEmail = (email, name) => ({
  type: GET_USER,
  email,
  name,
});

export const incrementScore = (payload) => ({
  type: INCREMENT_SCORE,
  payload,
});
