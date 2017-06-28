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
  HAS_ERRORED,
  SELECT_ALBUM,
  TOGGLE_SEARCH_TYPE,
  MAKE_ALBUM_WAIT,
  UPDATE_SEARCH_QUERY
} from '../constants';

import photosDb from '../photosDb'
import axios from 'axios'

export function toggleSearchType(){
  return {
    type: TOGGLE_SEARCH_TYPE
  }
}
// Load photos URLs from IDB
// This actions refreshes the store with photos
export function loadPhotos( fetchOnEmpty ) {
  return (dispatch) => {
    photosDb.table('photos')
      .toArray()
      .then((photos) => {
        dispatch({
          type: LOAD_PHOTOS,
          payload: photos,
        })
        return photos
      })
      .then((photos) => {
        if( !(photos && photos.length > 0) && fetchOnEmpty ){
          dispatch(fetchPhotos())
        }
      })
      .catch((error) => dispatch(hasErrored(error)))
  }
}

export function loadAlbums() {
  return (dispatch) => {
    photosDb.table('albums')
      .toArray()
      .then((albums) => {
        dispatch({
          type: LOAD_ALBUMS,
          payload: albums,
        })
        return albums
      })
      .catch((error) => dispatch(hasErrored(error)))
  }
}

// Load photos URLs from API
export function fetchPhotos( query, page ){
  const url = `https://api.flickr.com/services/rest/`
  return (dispatch) => {
    axios.get(url, {
      params: {
        method: "flickr.photos.search",
        api_key: "244a769a6bb7971f5e058655bd04e28c",
        text: query || 'nature',
        format: "json",
        nojsoncallback: "1",
        per_page: 25,
        page: page
      }
    })
    .then( (response) => {
      if(response.data.stat === "ok"){
        console.log("hello")
        console.log(response.data.photos.page)
        dispatch(makeAlbumWait(true))
        dispatch({
          type: FETCH_PHOTOS_SUCCESS,
          payload: response.data.photos.photo,
        })
      }else{ throw response.data.message }
    })
    .catch((error) => dispatch(hasErrored(error)))
  }
}

export function hasErrored(error){
  return {
    type: HAS_ERRORED,
    payload: error
  }
}

export function addSelected(id){
  return {
    type: ADD_SELECTED,
    payload: id
  }
}

export function clearSelected(id){
  return {
    type: CLEAR_SELECTED,
    payload: id
  }
}

export function removeSelected(ids, photos){
  //primary key: key, map ids to keys
  const keys = photos
    .filter( photo => ids.indexOf(photo.id) !== -1 )
    .map( photo => photo.key )
   return (dispatch) => {
    photosDb.table('photos')
      .bulkDelete(keys)
      .then(() => {
        dispatch({
          type: REMOVE_SELECTED
        });
      })
      .catch((error) => dispatch(hasErrored(error)))
  }
}

export function newAlbumInput( flag ){
  return {
    type: NEW_ALBUM_INPUT,
    payload: flag
  }
}

export function addNewAlbum( title, selected, allPhotos ){
  return (dispatch) => {
    // all other albums active false
    const albumToAdd = { title, active: true }
    photosDb.table('albums')
      .add(albumToAdd)
      .then((id) => {
        // Add photos with album ID to photos DB and reload store
         dispatch({
           type: ADD_NEW_ALBUM,
           payload: id
         })
         dispatch( addPhotosToAlbum( id, selected, allPhotos ) )
      })
      .catch((error) => dispatch(hasErrored(error)))
  }
}

export function addPhotosToAlbum( id, selected, allPhotos ){

  const photosToAdd = allPhotos
    .filter( photo => selected.indexOf(photo.id) !== -1 )
    .map( photo => Object.assign({}, photo, { albumId: id }) )

  return (dispatch) => {
    // add the albumId to selected photos
    // push photos to IDB
    photosDb.table('photos')
      .bulkAdd(photosToAdd)
      .then((lastPhotoId) => {
         dispatch({
           type: ADD_PHOTOS_TO_ALBUM,
           payload: id
         })
         dispatch( loadPhotos() )
         dispatch( loadAlbums() )
      })
      .catch((error) => dispatch(hasErrored(error)))
  }
}

export function selectAlbum(id, selectedAlbum){
  return (dispatch) => {
    if(selectedAlbum){
      // photos already loaded
      // set album and rerender
      dispatch({
        type: SELECT_ALBUM,
        payload: id
      })
    }else{
      // load photos from DB
      // set photos, set album and rerender
      dispatch(selectAlbum(id, true))
      dispatch(loadPhotos(false)) 
    }
  }
}

export function makeAlbumWait(flag){
  return {
    type: MAKE_ALBUM_WAIT,
    payload: flag
  }
}

export function updateSearchQuery(query){
  return {
    type: UPDATE_SEARCH_QUERY,
    payload: query
  }
}
