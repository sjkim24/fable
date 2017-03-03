import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("main");
  
  ReactDOM.render(<div>Hello World</div>, document.querySelector)
});
