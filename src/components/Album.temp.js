import React from 'react'
import Masonry from 'react-masonry-component'
import Photo from './Photo'
import './Album.css'

const masonryOptions = {
    transitionDuration: 0
}

function loadImages(images, callback) {
    let length, count, check, i, img

    length = images.length
    count = length

    check = function () {
        if (--count === 0) {
            callback()
            console.log(count)
        }
    }

    for (i = 0; i < length; i++) {
        img = new Image()
        img.onload = check
        img.onerror = check
        img.src = constructUrl( images[i] )
    }
}

// var images = [], html = '';

// $.each(response.showcase, function(index, item) {
//     html += '<li>';                
//     html += '<img src="mysite.it/pict_thumbs/' + item.pool_user_pict + '">';
//     html += '<label>' + item.username + '</label>';                       
//     html += '</li>';

//     images.push(item.pool_user_pict);
// });

// loadImages(images, function () {
//     $('#some-element').html(html);
// })

function constructUrl( photo ){
    return `https://farm${ photo.farm }.staticflickr.com/${ photo.server }/${ photo.id }_${ photo.secret }.jpg`
}

const Album = ({ photos, selected, addSelected, selectedAlbum, waiting, makeAlbumWait }) =>{
    
    let photosToLoad = photos
        .filter( photo => selectedAlbum && photo.albumId
            ? photo.albumId.toString() === selectedAlbum.toString()
            : true )
        .reverse()
    if(waiting){
        loadImages(photosToLoad, ()=>{
            makeAlbumWait(false)
        })
    }

    return <div className="content">
            { waiting
                ? <div>Loading...</div>
                :<Masonry className={'my-gallery-class'}
                    elementType={'ul'}
                    options={masonryOptions}
                >
                    { photosToLoad
                        .map( photo => {
                        const isSelected = selected.indexOf(photo.id) !== -1
                        return <Photo
                            photo={ { ...photo, isSelected } }
                            key={ photo.id }
                            addSelected={ addSelected }
                            url={ constructUrl(photo) }
                        />
                    })}
                </Masonry>
            }
        </div>
}

export default Album