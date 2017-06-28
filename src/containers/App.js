import { connect } from 'react-redux';

import App from '../components/App';

import {
  addSelected,
  clearSelected,
  removeSelected,
  newAlbumInput,
  addNewAlbum,
  addPhotosToAlbum,
  selectAlbum,
  toggleSearchType,
  fetchPhotos,
  makeAlbumWait,
  updateSearchQuery
} from '../actions';

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSelected(id){
      dispatch(addSelected(id))
    },
    clearSelected(id){
      dispatch(clearSelected(id))
    },
    removeSelected(selectedIds, photos){
      dispatch(removeSelected(selectedIds, photos))
    },
    setNewAlbumInput( flag ){
      dispatch(newAlbumInput( flag ))
    },
    addNewAlbum( title, selected, allPhotos ){
      dispatch(addNewAlbum( title, selected, allPhotos ))
    },
    addPhotosToAlbum( id, selected, allPhotos ){
      dispatch(addPhotosToAlbum( id, selected, allPhotos )) 
    },
    selectAlbum(id, selectedAlbum){
      dispatch(selectAlbum(id, selectedAlbum))
    },
    toggleSearchType(){
      dispatch(toggleSearchType())
    },
    fetchPhotos(q, p){
      dispatch(fetchPhotos(q, p))
    },
    makeAlbumWait(f){
      dispatch(makeAlbumWait(f))
    },
    updateSearchQuery(f){
      dispatch(updateSearchQuery(f))
    }

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
