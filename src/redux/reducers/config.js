import { GET_CATEGORY, GET_DIFFICULTY, GET_QUESTION_TYPE } from '../actions/typeActions';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  questionType: 0,
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
  default:
    return state;
  }
};
