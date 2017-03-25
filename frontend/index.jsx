import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';

// make sure all actions flow through the promise middleware before reaching the reducers
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

document.addEventListener("DOMContentLoaded", () => {  
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={hashHistory} routes={routes} />
    </Provider>
    , document.querySelector("#main")
  );
});
