import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'

import rootReducer from '../reducers';

const initialState = {
  todos: [],
  photos: [],
  albums: [],
  selected: [], //selectedPhotos
  newAlbumInput: false,
  page: '',
  selectedAlbum: "",
  searchQuery: '',
  searchType: 'tags',
  waiting: false,
  errored: false,
  error: ''
};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk, logger)
  ),
);

export default store;
