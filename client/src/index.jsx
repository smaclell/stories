import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import Router, {Route} from 'react-router';

import reducer from "./reducer"

import App from './components/App';
import {StoryContainer} from './components/Story';
import {fetchStarters} from './action_creators';

require("./styles/simple.css");

const logger = store => next => action => {
  // Filter out the thunks
  if(action.type === undefined) {
    return next(action);
  }

  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState().toJS());
  console.groupEnd(action.type);
  return result;
}

var store = createStore(reducer, applyMiddleware(logger,thunk));

store.dispatch( fetchStarters() );

const routes = <Route component={App}>
  <Route path="/" component={StoryContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
