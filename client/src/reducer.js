import {List, Map, fromJS} from 'immutable';

function save(state, text, parent) {
  if(!state.hasIn(['paragraphs', parent])) {
    return state;
  }

  const id = (state.get('paragraphs').size + 1).toString();
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

function showStory(state, starterId) {
  if(!state.hasIn(['paragraphs', starterId])) {
    return state;
  }

  return state.setIn(['story', 'starter'], starterId);
}

function receiveStarters(state, starters) {
  if( !state.has('starters') ) {
    state = state.set('starters', List());
  }

  var startersList = state.get('starters');

  for(var i in starters) {
    var s = starters[i];
    var data = fromJS(s);
    state = state.setIn(['paragraphs', s.id], data);

    if( !startersList.includes(s.id) ) {
      startersList = startersList.push(s.id);
    }
  };

  state = state.set('starters', startersList);

  return state;
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
    return showStory(state, action.starter);
  case 'RECIEVE_STARTERS':
    return receiveStarters(state, action.starters);
  case 'SHOW_CREATE_PARAGRAPH':
    return showCreate(state, action.parent);
  case 'HIDE_CREATE_PARAGRAPH':
    return hideCreate(state, action.parent);
  case 'SAVE_PARAGRAPH':
    return save(state, action.text, action.parent);
  }
  return state;
}
