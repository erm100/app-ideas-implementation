const add = function addAction(event) {
  return {
    type: 'add',
    event,
  };
};

const edit = function editAction(event) {
  return {
    type: 'edit',
    event,
  };
};

const remove = function removeAction(event) {
  return {
    type: 'remove',
    event,
  };
};

const recove = function removeAction(event) {
  return {
    type: 'recove',
    event,
  };
};

const nextState = function nextStateAction(event) {
  return {
    type: 'nextState',
  };
};

export const actions = {
  add,
  edit,
  remove,
  recove,
  nextState,
};
