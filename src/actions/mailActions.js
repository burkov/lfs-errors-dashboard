import { MAIL_INIT, MAIL_INIT_ERROR, MAIL_PROGRESS_UPDATE } from './actionTypes';

export const init = (client) => ({
  type: MAIL_INIT, client,
});

export const initError = () => ({
  type: MAIL_INIT_ERROR,
});