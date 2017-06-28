import {
  LOAD_PHOTOS,
  LOAD_ALBUMS,
  FETCH_PHOTOS_SUCCESS,
  ADD_SELECTED,
  CLEAR_SELECTED,
  REMOVE_SELECTED,
  NEW_ALBUM_INPUT,
  ADD_NEW_ALBUM,
  ADD_PHOTOS_TO_ALBUM,
  SELECT_ALBUM,
  HAS_ERRORED,
  TOGGLE_SEARCH_TYPE,
  MAKE_ALBUM_WAIT,
  UPDATE_SEARCH_QUERY
} from '../constants';

export default function (state, { type, payload }) {
  switch (type) {
    
    case TOGGLE_SEARCH_TYPE:
      return {
        ...state,
        searchType: state.searchType === 'tags' ? 'bbox' : 'tags'
      }
    
    case LOAD_PHOTOS:
      return {
        ...state,
        selected: [],
        newAlbumInput: false,
        photos: payload
      }
    
    case LOAD_ALBUMS:
      return {
        ...state,
        newAlbumInput: false,
        albums: payload,
        selectedAlbum: state.selectedAlbum
          ? state.selectedAlbum
          : payload.length > 0
            ? payload[0].id
            : ''
        
      }
    
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: payload,
        selectedAlbum: '',
        selected: [],
      }
    
    case HAS_ERRORED:
      return{
        ...state,
        errored: true,
        error: payload
      }
    
    case ADD_SELECTED:{
      const selected = state.selected.indexOf(payload) === -1
       ? state.selected.concat(payload)
       : state.selected.filter( item => item !== payload )
      return {
        ...state,
        selected
      }
    }
    
    case CLEAR_SELECTED:{
      // clone a new array from state, to use splice
      let selected = state.selected.slice()
      if(payload){
        let i = selected.indexOf(payload)
        selected.splice(i, 1)
      }else{
        // clear all selected
        selected = []
      }
      return {
        ...state,
        selected
      }
    }

    case REMOVE_SELECTED:{
      const photos = state.photos.filter( 
        (photo) => state.selected.indexOf(photo.id) === -1 
      )
      return{
        ...state,
        photos,
        selected: []
      }
    }

    case NEW_ALBUM_INPUT:
      return {
        ...state,
        newAlbumInput: payload
      }

    case SELECT_ALBUM:
      return {
        ...state,
        selectedAlbum: payload,
        selected: []
      }

    case ADD_PHOTOS_TO_ALBUM:
      return {
        ...state,
        selectedAlbum: payload,
        selected: []
      }

    case MAKE_ALBUM_WAIT:
      return {
        ...state,
        waiting: payload
      }

    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload
      }

    default: return state;
  }
}
