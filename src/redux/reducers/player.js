import { GET_USER, INCREMENT_SCORE } from '../actions/typeActions';

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
  default:
    return state;
  }
};
