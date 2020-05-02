import {_addEvent, _removeEvent, _editEvent, _recoveEvent} from 'src/eventList';

const initialState = {
  ids: {},
  events: [],
};

const eventList = function eventListReducer(state = initialState, action) {
  let events = state.events;
  let event = action.event;
  let ids = {};
  switch (action.type) {
    case 'add':
      events = _addEvent(event, events);
      events.forEach((elem, index) => (ids[elem.id] = index));
      return {
        ...state,
        events,
        ids,
      };
    case 'remove':
      events = _removeEvent(event, events);
      events.forEach((elem, index) => (ids[elem.id] = index));
      return {
        ...state,
        events,
        ids,
      };
    case 'edit': {
      events = _editEvent(event, events);
      events.forEach((elem, index) => (ids[elem.id] = index));
      return {
        ...state,
        events,
        ids,
      };
    }
    case 'recove': {
      events = _recoveEvent(event, events);
      events.forEach((elem, index) => (ids[elem.id] = index));
      return {
        ...state,
        events,
        ids,
      };
    }
    default:
      return state;
  }
};

const add = function addReducer(state = initialState, action) {
  switch (action.type) {
    case 'add': {
      return {
        id: action.event.id,
      };
    }
    default:
      return {
        id: null,
      };
  }
};

const edit = function editReducer(state = initialState, action) {
  switch (action.type) {
    case 'edit': {
      return {
        time: `${action.event.start}-${action.event.end}`,
        event: action.event,
        id: action.event.id,
      };
    }
    default:
      return {
        event: null,
        id: null,
      };
  }
};

const remove = function removeReducer(state = initialState, action) {
  switch (action.type) {
    case 'remove': {
      return {
        event: action.event,
      };
    }
    default:
      return {
        event: null,
      };
  }
};

export const reducers = {
  eventList,
  add,
  remove,
  edit,
};
