import React from 'react'
import './AlbumList.css'

const AlbumItem = ({id, title, active, selectAlbum, selectedAlbum}) => {
    return  <li
        onClick={() => { selectAlbum(id, selectedAlbum) } }
        data-id={id}
        className={ active ? "active" : "" }
    >
        <i className="fa fa-picture-o"/>
        {title}
    </li>
}
// selectedAlbum = is a prop set depending on if album selected or not '' or id; current selectedAlbum
//selectAlbum = action to select an album in the list
const AlbumList = ({ albums, selectedAlbum, selectAlbum }) =>{
    return <ul className="album-list" >
        {albums.length === 0
            ? <div className="no-albums">
                <i className="fa fa-info-circle"/>
                Search and add photos to an album
            </div>
            :albums.map( a => 
                <AlbumItem
                    id={a.id}
                    title={a.title}
                    key={a.id}
                    active={a.id.toString() === selectedAlbum.toString()}
                    selectAlbum={selectAlbum}
                    selectedAlbum={selectedAlbum}
                ></AlbumItem>
            )}
    </ul>
}

export default AlbumList