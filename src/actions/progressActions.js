import {PROGRESS_DEACTIVATE, PROGRESS_INCREMENT, PROGRESS_ACTIVATE} from './actionTypes';

export const activateProgress = ({ message, current, max, active }) => ({
  type: PROGRESS_ACTIVATE,
  message,
  current,
  max,
  active,
});

export const incrementProgress = () => ({
  type: PROGRESS_INCREMENT,
});

export const deactivateProgress = () => ({
  type: PROGRESS_DEACTIVATE,
});