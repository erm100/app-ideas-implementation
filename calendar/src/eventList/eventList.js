import {compareDate, buildEvent} from 'src/utils';
import isArray from 'isarray';

export const _addEvent = function _addEvent(event, events) {
  let currIndex = 0;
  let currEvent = events[currIndex];

  if (events.length === 0) {
    events.push(buildEvent(event));
  } else if (compareDate(event.start, currEvent.start)) {
    events.unshift(buildEvent(event));
  } else if (compareDate(events[events.length - 1].start, event.start)) {
    events.push(buildEvent(event));
  } else {
    while (currEvent) {
      if (compareDate(event.start, currEvent.start)) {
        events.splice(currIndex - 1, 0, buildEvent(event));
        break;
      }
      currEvent = events[++currIndex];
    }
  }

  return events;
};

export const _removeEvent = function _removeEvent(event, events) {
  if (!isArray(event)) {
    event = [event];
  }
  let currIndex = 0;
  let currEvent = events[currIndex];
  const ids = event.map(elem => elem.id);
  while (currEvent) {
    if (ids.includes(currEvent.id)) {
      events.splice(currIndex, 1);
      currEvent = events[currIndex];
      continue;
    }
    currEvent = events[++currIndex];
  }
  return events;
};

export const _recoveEvent = function _recoveEvent(event, events) {
  if (isArray(event)) {
    return event.map(elem => _addEvent(elem, events)).pop();
  } else {
    return _addEvent(event, events);
  }
};

export const _editEvent = function _editEvent(event, events) {
  let currIndex = 0;
  let currEvent = events[currIndex];
  while (currEvent) {
    if (event.id === currEvent.id) {
      events.splice(currIndex, 1, buildEvent(event));
      break;
    }
    currEvent = events[++currIndex];
  }
  return events;
};
