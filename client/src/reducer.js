import {List, Map, fromJS} from 'immutable';

function save(state, text, parent, tempId) {
  if(!state.hasIn(['paragraphs', parent])) {
    return state;
  }

  const paragraph = Map({id: tempId, text: text})

  return state
    .updateIn(
      ['paragraphs', parent, 'paragraphs'],
      List(),
      paragraphs => paragraphs.unshift(tempId)
    )
    .deleteIn(['paragraphs', parent, 'creating'])
    .setIn(['paragraphs', tempId], paragraph);
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

function receiveParagraph(state, parent, paragraph, url, tempId) {
  let data = fromJS( paragraph );

  state = state.setIn(['paragraphs', paragraph.id], data);

  if( !state.hasIn(['paragraphs', parent])) {
    return state;
  }

  return state
    .updateIn(
      ['paragraphs', parent, 'links'],
      List(),
      list => {
        let i = list.indexOf( url );
        if( i < 0 ) {
          return list;
        }

        return list.delete(i);
      }
    )
    .updateIn(
      ['paragraphs', parent, 'paragraphs'],
      List(),
      list => list.push(paragraph.id)
    );
}

function replaceParagraph(state, parent, tempId, paragraph) {
  let data = fromJS( paragraph );

  return state
    .setIn(['paragraphs', paragraph.id], data)
    .deleteIn(['paragraphs', tempId])
    .updateIn(
      ['paragraphs', parent, 'paragraphs'],
      List(),
      list => {
        let i = list.indexOf( tempId );
        if( i < 0 ) {
          return list;
        }

        return list.delete(i);
      }
    )
    .updateIn(
      ['paragraphs', parent, 'paragraphs'],
      List(),
      list => list.push(paragraph.id)
    );
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

var INITIAL_STATE = Map();

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case 'SHOW_STORY':
    return showStory(state, action.starter);
  case 'RECIEVE_STARTERS':
    return receiveStarters(state, action.starters);
  case 'RECIEVE_PARAGRAPH':
    return receiveParagraph(state, action.parent, action.paragraph, action.url);
  case 'SHOW_CREATE_PARAGRAPH':
    return showCreate(state, action.parent);
  case 'HIDE_CREATE_PARAGRAPH':
    return hideCreate(state, action.parent);
  case 'SAVE_TEMP_PARAGRAPH':
    return save(state, action.text, action.parent, action.tempId);
  case 'REPLACE_TEMP_PARAGRAPH':
    return replaceParagraph(state, action.parent, action.tempId, action.paragraph);
  }
  return state;
}
