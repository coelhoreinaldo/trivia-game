import { GET_USER } from './typeActions';

export const getEmail = (email, name) => ({
  type: GET_USER,
  email,
  name,
});
