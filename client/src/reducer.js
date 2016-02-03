import {List, Map, fromJS} from 'immutable';

function save(state, text) {
  const paragraphs = state.getIn(['story', 'paragraphs']) || List();

  const id = state.get('haxLastId') + 1;

  const paragraph = Map({id: id, text: text})

  return state
    .set('haxLastId', id)
    .deleteIn(['story','creating'])
    .setIn(['story', 'paragraphs'], paragraphs.push(paragraph));
}

function create(state, starter) {
  var change = {story: {creating: true}}
  if(starter !== undefined) {
    change.story.starter = starter;
  }
  return state.mergeDeep(change);
}

var INITIAL_STATE = fromJS({
  haxLastId: 3,
  starters: {
    "1": {id: 1, text: "Once upon a time"}
  },
  story: {
    starter: 1,
    paragraphs: [
      {id: 2, text: "A"},
      {id: 3, text: "B"}
    ]
  }
});

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case 'SHOW_STORY':
    return state;
  case 'CREATE_PARAGRAPH':
    return create(state, action.starter);
  case 'SAVE_PARAGRAPH':
    return save(state, action.text);
  }
  return state;
}
