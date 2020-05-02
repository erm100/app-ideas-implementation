import moment from 'moment';

export const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss';
export const format = function formatDate(date) {
  return moment(date).format(FORMAT_TIME);
};
