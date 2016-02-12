import {List, Map, fromJS} from 'immutable';

function save(state, text, parent) {
  if(!state.hasIn(['paragraphs', parent])) {
    return state;
  }

  const id = (parseInt(state.get('paragraphs').last().get('id')) + 1).toString();
  const paragraph = Map({id: id, text: text})

  return state
    .updateIn(
      ['paragraphs', parent, 'paragraphs'],
      List(),
      paragraphs => paragraphs.unshift(id)
    )
    .deleteIn(['paragraphs', parent, 'creating'])
    .setIn(['paragraphs', id], paragraph);
}

function showCreate(state, parent) {
  if(!state.hasIn(['paragraphs', parent])) {
    return state;
  }

  return state.setIn(['paragraphs', parent, 'creating'], true);
}

function hideCreate(state, parent) {
  return state.deleteIn(['paragraphs', parent, 'creating'])
}

var INITIAL_STATE = fromJS({
  starters: {
    "1": {id: "1", text: "Once upon a time", paragraphs: ["2", "3"] }
  },
  paragraphs: {
    "1": {id: "1", text: "Once upon a time", paragraphs: ["2", "3"]},
    "2": {id: "2", text: "A", paragraphs: ["4", "5"]},
    "3": {id: "3", text: "B"},
    "4": {id: "4", text: "A1"},
    "5": {id: "5", text: "A2"}
  },
  story: {
    starter: "1"
  }
});

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case 'SHOW_STORY':
    return state;
  case 'SHOW_CREATE_PARAGRAPH':
    return showCreate(state, action.parent);
  case 'HIDE_CREATE_PARAGRAPH':
    return hideCreate(state, action.parent);
  case 'SAVE_PARAGRAPH':
    return save(state, action.text, action.parent);
  }
  return state;
}
