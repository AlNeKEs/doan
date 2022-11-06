import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import reducers from "./redux/reducers";
import sagas from "./redux/sagas"

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers(), {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);
window.store = store;

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
 <Provider store={store}>
  <App/>
 </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
