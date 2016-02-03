import {List, Map, OrderedMap, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SAVE_PARAGRAPH adding after existing paragraph', () => {
    const initialState = Map({
      haxLastId: 1,
      story: Map({
        creating: true,
        paragraphs:List([
          Map({id: 1, text: "sample"})
        ])
      })
    });

    const action = {
      type: 'SAVE_PARAGRAPH',
      text: "new"
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      haxLastId: 2,
      story: {
        paragraphs: [
          {id: 1, text: "sample"},
          {id: 2, text: "new"}
        ]
      }
    }));
  });

  it('handles SAVE_PARAGRAPH adding after starter', () => {
    const initialState = Map({
      haxLastId: 1,
      story: Map({
        creating: true,
        starter: 1
      })
    });

    const action = {
      type: 'SAVE_PARAGRAPH',
      text: "new"
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      haxLastId: 2,
      story: {
        starter: 1,
        paragraphs: [
          {id: 2, text: "new"}
        ]
      }
    }));
  });

  it('handles CREATE_PARAGRAPH for an existing story', () => {
    const initialState = Map({
      story: Map({
        starter: 1
      })
    });

    const action = {
      type: 'CREATE_PARAGRAPH'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      story: {
        creating: true,
        starter: 1
      }
    }));
  });

  it('handles CREATE_PARAGRAPH for a new story', () => {
    const initialState = Map({
    });

    const action = {
      type: 'CREATE_PARAGRAPH',
      starter: 1
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      story: {
        creating: true,
        starter: 1
      }
    }));
  });

});
