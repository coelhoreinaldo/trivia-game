import { GET_AMOUNT, GET_CATEGORY, GET_DIFFICULTY,
  RESET_SETTINGS } from '../actions/typeActions';

const INITIAL_STATE = {
  category: 0,
  difficulty: '',
  amount: 5,
};

export const config = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case GET_CATEGORY:
    return {
      ...state,
      category: payload,
    };
  case GET_DIFFICULTY:
    return {
      ...state,
      difficulty: payload,
    };
  case GET_AMOUNT:
    return {
      ...state,
      amount: payload,
    };
  case RESET_SETTINGS:
    return {
      category: 0,
      difficulty: '',
      amount: 5,
    };
  default:
    return state;
  }
};
