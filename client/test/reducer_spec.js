import {List, Map, OrderedMap, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SHOW_STORY with existing paragraph', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {ignored: true}
      }
    });

    const action = {
      type: 'SHOW_STORY',
      starter: '1'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {ignored: true}
        },
        story: {
          starter: '1'
        }
      }
    ));
  });

  it('handles SHOW_STORY with existing paragraph and story', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {ignored: true},
        '2': {ignored: true}
      },
      story: {
        starter: '2'
      }
    });

    const action = {
      type: 'SHOW_STORY',
      starter: '1'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {ignored: true},
          '2': {ignored: true},
        },
        story: {
          starter: '1'
        }
      }
    ));
  });

  it('handles SHOW_STORY with missing paragraph', () => {
    const initialState = fromJS({
      paragraphs: {
      }
    });

    const action = {
      type: 'SHOW_STORY',
      starter: '1'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(initialState);
  });

  it('handles RECIEVE_STARTERS with no data', () => {
    const initialState = fromJS({
    });

    const action = {
      type: 'RECIEVE_STARTERS',
      starters: [
        {id: '1', text: 'a', links: ['/a/', '/b/']},
        {id: '2', text: 'b'}
      ]
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        starters: ['1', '2'],
        paragraphs: {
          '1': {id: '1', text: 'a', links: ['/a/', '/b/']},
          '2': {id: '2', text: 'b'}
        }
      }
    ));
  });

  it('handles RECIEVE_STARTERS with existing data', () => {
    const initialState = fromJS({
      starters: ['1', '3'],
        paragraphs: {
          '1': {id: '1', text: 'q', links: ['/q/']},
          '3': {id: '3', text: 'existing' }
        }
    });

    const action = {
      type: 'RECIEVE_STARTERS',
      starters: [
        {id: '1', text: 'a', links: ['/a/', '/b/']},
        {id: '2', text: 'b'}
      ]
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        starters: ['1', '3', '2'],
        paragraphs: {
          '1': {id: '1', text: 'a', links: ['/a/', '/b/']},
          '2': {id: '2', text: 'b'},
          '3': {id: '3', text: 'existing' }
        }
      }
    ));
  });

  it('handles RECIEVE_PARAGRAPH with no parent', () => {
    const initialState = fromJS({
    });

    const action = {
      type: 'RECIEVE_PARAGRAPH',
      parent: '1',
      paragraph: {id: '2', text: 'b', links: ['/a/', '/b/']}
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '2': {id: '2', text: 'b', links: ['/a/', '/b/']}
        }
      }
    ));
  });

  it('handles RECIEVE_PARAGRAPH with parent', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'a', links: ['/a/', '/b/']}
      }
    });

    const action = {
      type: 'RECIEVE_PARAGRAPH',
      parent: '1',
      paragraph: {id: '2', text: 'b', links: ['/c/', '/d/']},
      url: '/a/'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'a', links: ['/b/'], paragraphs: ['2']},
          '2': {id: '2', text: 'b', links: ['/c/', '/d/']}
        }
      }
    ));
  });

  // TODO: Handle nested temp paragraphs
  it('handles REPLACE_TEMP_PARAGRAPH by deleting temp paragraph and replacing the tempId', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'a', paragraphs: ['t']},
        't': {id: 't', text: 'b', links: ['/c/', '/d/']}
      }
    });

    const action = {
      type: 'REPLACE_TEMP_PARAGRAPH',
      parent: '1',
      tempId: 't',
      paragraph: {id: '2', text: 'b', links: ['/c/', '/d/']},
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'a', paragraphs: ['2']},
          '2': {id: '2', text: 'b', links: ['/c/', '/d/']}
        }
      }
    ));
  });

  it('handles SAVE_TEMP_PARAGRAPH as the first child of an existing paragraph', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample'}
      }
    });

    const action = {
      type: 'SAVE_TEMP_PARAGRAPH',
      text: 'new',
      parent: '1',
      tempId: 't'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'sample', paragraphs: ['t'] },
          't': {id: 't', text: 'new'}
        }
      }
    ));

  });

  it('handles SAVE_TEMP_PARAGRAPH as an extra child of an existing paragraph', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample', paragraphs: ['2'] },
        '2': {id: '2', text: 'other'}
      }
    });

    const action = {
      type: 'SAVE_TEMP_PARAGRAPH',
      text: 'new',
      parent: '1',
      tempId: 't'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'sample', paragraphs: ['t', '2'] },
          '2': {id: '2', text: 'other'},
          't': {id: 't', text: 'new'}
        }
      }
    ));

  });

  it('handles SAVE_TEMP_PARAGRAPH removes "creating" from the paragraph', () => {
    const initialState = fromJS({
      paragraphs: {
        '1': {id: '1', text: 'sample', creating: true}
      }
    });

    const action = {
      type: 'SAVE_TEMP_PARAGRAPH',
      text: 'new',
      parent: '1',
      tempId: 't'
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
        paragraphs: {
          '1': {id: '1', text: 'sample', paragraphs: ['t'] },
          't': {id: 't', text: 'new'}
        }
      }
    ));

  });

  it('handles SAVE_TEMP_PARAGRAPH with missing parent', () => {
    const initialState = Map({
      paragraphs: Map({
        '1': {id: '1', text: 'sample' }
      })
    });

    const action = {
      type: 'SAVE_TEMP_PARAGRAPH',
      text: 'new',
      parent: '2',
      tempId: 't'
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
