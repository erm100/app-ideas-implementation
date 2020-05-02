import {buildEvent, format} from 'src/utils';
import moment from 'moment';
import shortid from 'shortid';

export const generatorEvents = function generatorEvents(
  leng = 1000,
  days = 365,
) {
  const arr = [...new Array(leng)];
  const ids = {};
  const events = arr.map((elem, index) => {
    const id = shortid();
    ids[id] = index;
    return buildEvent({
      id: id,
      title: `title_${index}`,
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start: format(
        moment()
          .add(Math.floor((Math.random() * days) / 2), 'days')
          .add(Math.floor(Math.random() * 72), 'hours')
          .add(Math.floor(Math.random() * 60), 'minutes'),
      ),
      end: format(
        moment()
          .add(Math.floor((Math.random() * days) / 2), 'days')
          .add(Math.floor(Math.random() * 72), 'hours')
          .add(Math.floor(Math.random() * 60), 'minutes'),
      ),
    });
  });
  return {
    ids,
    events,
  };
};
