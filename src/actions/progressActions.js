import { PROGRESS_UPDATE } from './actionTypes';

export const updateProgress = ({ message, current, max, active }) => ({
  type: PROGRESS_UPDATE,
  progress: {
    message,
    current,
    max,
    active,
  },
});