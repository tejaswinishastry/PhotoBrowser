import React from 'react'
import Masonry from 'react-masonry-component'
import Photo from './Photo'
import './Album.css'

function constructUrl( photo ){
    return `https://farm${ photo.farm }.staticflickr.com/${ photo.server }/${ photo.id }_${ photo.secret }.jpg`
}

const masonryOptions = {
    transitionDuration: '0.3s',
    stagger: 30
}
//class component
const Album = React.createClass({
    componentDidMount: function() {
        this.props.makeAlbumWait(true)
    },
    handleImagesLoaded: function(imagesLoadedInstance) {
        this.props.makeAlbumWait(false)
    },
    render: function(){
        const { photos, selected, addSelected, selectedAlbum, waiting, makeAlbumWait } = this.props
        return (
            <div className="album">
                <Masonry
                    elementType={'ul'}
                    onImagesLoaded={this.handleImagesLoaded}
                    options={masonryOptions}
                >
                {
                    photos
                    .filter( photo => (selectedAlbum && photo.albumId)
                        // filter and show photos of selectedAlbum
                        ? photo.albumId.toString() === selectedAlbum.toString()
                        // show all the photos, don't filter, return true for everything
                        : true )
                    .reverse()
                    .map( photo => {
                        const isSelected = selected.indexOf(photo.id) !== -1
                        return <Photo
                            photo={ { ...photo, isSelected } }
                            key={ photo.id } //React requirement - Any list in react should have a key
                            addSelected={ addSelected }
                            url={ constructUrl(photo) }
                        />
                    })
                }
                </Masonry>
            </div>
        )
    }
})

export default Album