import shortid from 'shortid';

import {FORMAT_TIME} from './format';
import moment from 'moment';

export const buildEvent = function buildEventUtil(event) {
  const start = event.start || moment().format(FORMAT_TIME);
  return {
    id: event.id || shortid(),
    title: event.title || '',
    start: start,
    end:
      event.end ||
      moment(start)
        .add(1, 'hours')
        .format(FORMAT_TIME),
    summary: event.summary || '',
  };
};
