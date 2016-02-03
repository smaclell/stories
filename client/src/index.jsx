import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import Router, {Route} from 'react-router';

import reducer from "./reducer"

import App from './components/App';
import {StoryContainer} from './components/Story';

require("./styles/simple.css");

var store = createStore(reducer);

const routes = <Route component={App}>
  <Route path="/" component={StoryContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
