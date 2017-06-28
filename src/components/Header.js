import React from "react"
import "./Header.css"
import { ButtonGroup, Dropdown, MenuItem, Button, FormGroup, InputGroup, FormControl, Radio } from "react-bootstrap"

const Header = ({ albums, photos, searchType, selected, clearSelected, removeSelected, newAlbumInput, setNewAlbumInput, addNewAlbum, addPhotosToAlbum, selectedAlbum, toggleSearchType, fetchPhotos, updateSearchQuery, searchQuery  }) => {
    
    // EVENTS
    function _clearAll(e){
        clearSelected()
    }
    function _removeSelected( e ){
        removeSelected(selected, photos)
    }
    function dropdownChange( albumId ){
        if(albumId === "*NEW*"){
            // Create new album
            setNewAlbumInput(true)
        } else {
            // existing album
            addPhotosToAlbum( albumId, selected, photos )
        }
    }
    function _onKeyDownNewAlbumInput(e){
        if(e.keyCode === 13){
            // ENTER
            addNewAlbum(e.target.value, selected, photos)
        }
    }

    function _onKeyDownSearchInput(e){
        if(e.keyCode === 13){
            // ENTER
            fetchPhotos(searchQuery)
            e.target.value = ''
            updateSearchQuery(e.target.value)
        }
    }

    function _onChangeSearchInput(e){
        updateSearchQuery(e.target.value)
    }

    function _onClickAlbumInput(e){
        e.stopPropagation()
    }

  return (
    <div className="header-bar">
        <div>
            <div className="branding">
                <i className="fa fa-camera-retro" />
                <span>PhotoBrowser</span>
            </div>

                <div className="search-bar">
                    <FormControl
                        type="search"
                        placeholder="Search by location or tags"
                        onKeyDown={_onKeyDownSearchInput}
                        onChange={_onChangeSearchInput}
                    />
                    <i className="fa fa-search search-icon"/>
                </div>


            <div className="header-extras">
            {
                selected.length > 0 && !newAlbumInput
                ? <ButtonGroup className="header-buttons">
                    { !selectedAlbum
                        //plus button not shown if album is selected
                        ?<Dropdown id="create-album-dropdown" onSelect={dropdownChange}>
                            <Dropdown.Toggle noCaret>
                                <i className="fa fa-plus" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                { albums.map( (a) => (
                                    <MenuItem key={a.id} eventKey={a.id}>{a.title}</MenuItem>
                                ))}
                                <MenuItem divider />
                                <MenuItem eventKey="*NEW*" active>New Album</MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                        : null
                    }
                    <Button onClick={_removeSelected}><i className="fa fa-trash-o" /></Button>
                    <Button onClick={_clearAll}><i className="fa fa-times" /></Button>
                 </ButtonGroup>
                : selected.length > 0 && newAlbumInput
                    ? <div className="new-album-input">
                        <FormControl
                            type="text"
                            placeholder="Add New Album"
                            autoFocus
                            onKeyDown={_onKeyDownNewAlbumInput}
                            onClick={_onClickAlbumInput}
                        />
                    </div>
                    : null
            }
            </div>
        </div>
    </div>
  );
};

export default Header;
