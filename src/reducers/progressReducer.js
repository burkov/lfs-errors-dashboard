import { PROGRESS_UPDATE } from '../actions/actionTypes';

const initialState = {
  max: undefined,
  current: undefined,
  active: true,
  message: 'Loading...',
};


export const progressReducer = (state = initialState, action) => {
  const { type, message, active, max, current } = action;
  switch (type) {
    case PROGRESS_UPDATE:
      return { ...state, active, max, current, message };
    default:
      return state;
  }
};
