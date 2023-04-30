import { GET_CATEGORY, GET_DIFFICULTY,
  GET_QUESTION_TYPE, RESET_SETTINGS } from '../actions/typeActions';

const INITIAL_STATE = {
  category: 0,
  difficulty: '',
  questionType: '',
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
  case GET_QUESTION_TYPE:
    return {
      ...state,
      questionType: payload,
    };
  case RESET_SETTINGS:
    return {
      category: 0,
      difficulty: '',
      questionType: '',
    };
  default:
    return state;
  }
};
