import {format} from './format';

export const compareDate = function compareDate(aDate, bDate) {
  return format(aDate) > format(bDate);
};
