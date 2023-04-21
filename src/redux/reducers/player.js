import { GET_ASSERTIONS,
  GET_USER,
  INCREMENT_SCORE,
  RESET_USER } from '../actions/typeActions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
  assertions: 0,
};

export const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      gravatarEmail: action.email,
      name: action.name,
    };
  case INCREMENT_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.assertions,
    };
  case RESET_USER:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};
