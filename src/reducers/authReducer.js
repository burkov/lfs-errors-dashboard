import { AUTH_INIT, AUTH_INIT_ERROR, AUTH_SIGN_IN, AUTH_SIGN_OUT } from '../actions/actionTypes';

const throwNotInitialized = () => {
  throw Error('gauth is not initialized yet');
};

const initialState = {
  initialized: false,
  isSignedIn: false,
  profile: {},
  tokens: {},
  error: undefined,
  signIn: throwNotInitialized,
  signOut: throwNotInitialized,
};


export const authReducer = (state = initialState, action) => {
  const { signIn, signOut, error, profile, tokens } = action;
  switch (action.type) {
    case AUTH_INIT:
      return { ...state, initialized: true, signIn, signOut };
    case AUTH_INIT_ERROR:
      return { ...initialState, error };
    case AUTH_SIGN_IN:
      return { ...state, isSignedIn: true, profile, tokens };
    case AUTH_SIGN_OUT:
      return { ...state, isSignedIn: false, profile: {}, tokens: {} };
    default:
      return state;
  }
};