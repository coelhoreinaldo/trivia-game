import { GET_USER } from '../actions/typeActions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  score: 0,
};

export const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      gravatarEmail: action.email,
      name: action.name,
    };
  default:
    return state;
  }
};
