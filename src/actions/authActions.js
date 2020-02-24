import {AUTH_INIT, AUTH_INIT_ERROR, AUTH_SIGN_IN, AUTH_SIGN_OUT} from './actionTypes';

export const init = ({ signIn, signOut }) => ({
  type: AUTH_INIT,
  signIn,
  signOut,
});

export const initError = (error) => ({
  type: AUTH_INIT_ERROR,
  error,
});

export const signIn = ({ profile, tokens }) => ({
  type: AUTH_SIGN_IN,
  profile,
  tokens,
});

export const signOut = () => ({
  type: AUTH_SIGN_OUT,
});

