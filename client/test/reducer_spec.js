import {List, Map, OrderedMap, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles FETCHED_STARTERS saves starter paragraphs', () => {
    // TODO: Mock and fetch the goods.
    const initialState = fromJS({
    });

    const action = {
      type: 'FETCHED_STARTERS',
      result: {
        _links: {
          items: [{
            _links: [
              { href: '/x/b' },
              { href: '/x/c' },
            ],
            id: 'a',
            text: 'text'
          },
          {
            _links: [
              { href: '/x/e' },
              { href: '/x/f' },
            ],
            id: 'd',
            text: 'other'
          }]
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample', paragraphs: ['2'] },
        '2': {id: '2', text: 'other'}
      }
    }));
  });

  it('handles SAVE_PARAGRAPH as the first child of an existing paragraph', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample'}
      }
    });

    const action = {
      type: 'SAVE_PARAGRAPH',
      text: 'new',
      parent: '1'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'sample', paragraphs: ['2'] },
          '2': {id: '2', text: 'new'}
        }
      }
    ));

  });

  it('handles SAVE_PARAGRAPH as an extra child of an existing paragraph', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample', paragraphs: ['2'] },
        '2': {id: '2', text: 'other'}
      }
    });

    const action = {
      type: 'SAVE_PARAGRAPH',
      text: 'new',
      parent: '1'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'sample', paragraphs: ['3', '2'] },
          '2': {id: '2', text: 'other'},
          '3': {id: '3', text: 'new'}
        }
      }
    ));

  });

  it('handles SAVE_PARAGRAPH removes "creating" from the paragraph', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample', creating: true}
      }
    });

    const action = {
      type: 'SAVE_PARAGRAPH',
      text: 'new',
      parent: '1'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'sample', paragraphs: ['2'] },
          '2': {id: '2', text: 'new'}
        }
      }
    ));

  });

  it('handles SAVE_PARAGRAPH with missing parent', () => {
    const initialState = Map({
      paragraphs: Map({
        '1': {id: '1', text: 'sample' }
      })
    });

    const action = {
      type: 'SAVE_PARAGRAPH',
      text: 'new',
      parent: '2'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(initialState);
  });

  it('handles SHOW_CREATE_PARAGRAPH on valid parent', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample' }
      }
    });

    const action = {
      type: 'SHOW_CREATE_PARAGRAPH',
      parent: '1'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'sample', creating: true }
        }
      }
    ));

  });

  it('handles SHOW_CREATE_PARAGRAPH with missing parent', () => {
    const initialState = Map({
      paragraphs: Map({
        '1': {id: '1', text: 'sample' }
      })
    });

    const action = {
      type: 'SHOW_CREATE_PARAGRAPH',
      parent: '2'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(initialState);
  });

  it('handles HIDE_CREATE_PARAGRAPH on valid parent who is creating', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample', creating: true }
      }
    });

    const action = {
      type: 'HIDE_CREATE_PARAGRAPH',
      parent: '1'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'sample' }
        }
      }
    ));

  });

  it('handles HIDE_CREATE_PARAGRAPH on valid parent who is not creating', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample' }
      }
    });

    const action = {
      type: 'HIDE_CREATE_PARAGRAPH',
      parent: '1'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(initialState);

  });

  it('handles HIDE_CREATE_PARAGRAPH with missing parent', () => {
    const initialState = Map({
      paragraphs: Map({
        '1': {id: '1', text: 'sample' }
      })
    });

    const action = {
      type: 'HIDE_CREATE_PARAGRAPH',
      parent: '2'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(initialState);
  });

});
