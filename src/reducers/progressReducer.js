import {PROGRESS_ACTIVATE, PROGRESS_DEACTIVATE, PROGRESS_INCREMENT} from '../actions/actionTypes';

const initialState = {
  active: false,
  max: undefined,
  current: undefined,
  message: 'Loading...',
};


export const progressReducer = (state = initialState, action) => {
  const { type, message, max, current } = action;
  switch (type) {
    case PROGRESS_ACTIVATE:
      return { ...state, active: true, max, current, message };
    case PROGRESS_INCREMENT:
      return { ...state, current: state.current + 1 };
    case PROGRESS_DEACTIVATE:
      return { ...state, active: false };
    default:
      return state;
  }
};
