import {PROGRESS_ACTIVATE, PROGRESS_DEACTIVATE, PROGRESS_INCREMENT} from './actionTypes';

export const activateProgress = ({ message, current, max }) => ({
  type: PROGRESS_ACTIVATE,
  message,
  current,
  max,
});

export const incrementProgress = () => ({
  type: PROGRESS_INCREMENT,
});

export const deactivateProgress = () => ({
  type: PROGRESS_DEACTIVATE,
});