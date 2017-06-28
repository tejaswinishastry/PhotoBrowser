import React from 'react';
import './App.css';

import Header from './Header'
import AlbumList from './AlbumList'
// import Album from './Album'
import Album from './Album'

const App = ({
  photos,
  albums,
  selected,
  addSelected,
  clearSelected,
  removeSelected,
  newAlbumInput,
  setNewAlbumInput,
  searchQuery,
  searchType,
  addNewAlbum,
  addPhotosToAlbum,
  selectedAlbum,
  selectAlbum,
  toggleSearchType,
  fetchPhotos,
  waiting,
  page,
  makeAlbumWait,
  updateSearchQuery
  }) => <main className="App" onClick={ () => { if(newAlbumInput) setNewAlbumInput(false) } }>

  <Header
    albums={ albums }
    photos={ photos }
    selected={ selected }
    searchType={ searchType }
    clearSelected={ clearSelected }
    removeSelected={ removeSelected }
    setNewAlbumInput={ setNewAlbumInput }    
    newAlbumInput={ newAlbumInput }
    addNewAlbum={ addNewAlbum }
    addPhotosToAlbum={ addPhotosToAlbum }
    selectedAlbum={selectedAlbum}
    toggleSearchType={toggleSearchType}
    fetchPhotos={fetchPhotos}
    updateSearchQuery={updateSearchQuery}
    searchQuery={searchQuery}
  />
  <div className="main-content">
     <AlbumList
      albums={albums}
      selectedAlbum={selectedAlbum}
      selectAlbum={selectAlbum}
    ></AlbumList>
    <Album //React.createElement(Album,props)
      photos={ photos }
      addSelected={ addSelected }
      selected={ selected }
      selectedAlbum={ selectedAlbum }
      waiting={ waiting } //dint work; tried to make image loading happen after images are loaded
      makeAlbumWait={ makeAlbumWait }
    />
  </div>
  

</main>;

export default App;
