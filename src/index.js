import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {loadTodos, loadPhotos, loadAlbums} from './actions';
import store from './store';
import {LOAD_TODOS} from './constants';

import App from './containers/App';
import './index.css';

store.dispatch(loadPhotos( true ))
store.dispatch(loadAlbums())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
