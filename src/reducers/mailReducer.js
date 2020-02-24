import {MAIL_INIT, MAIL_INIT_ERROR} from '../actions/actionTypes';

const initialState = {
  initialized: false,
  client: undefined,
  error: undefined,
};

export const mailReducer = (state = initialState, action) => {
  const { client, error } = action;
  switch (action.type) {
    case MAIL_INIT:
      return { ...state, client, initialized: true };
    case MAIL_INIT_ERROR:
      return { ...initialState, error };
    default:
      return state;
  }
};