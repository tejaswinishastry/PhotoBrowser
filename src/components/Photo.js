import React from 'react'
import './Photo.css'
//album child
//TODO: if the image height can be known before render, it will be smoother 
const Photo = ({photo, addSelected, url}) => {

    return (
        <li className={`grid-item ${ photo.isSelected ? 'selected' : '' }` }
            onClick={ (e) => { e.preventDefault(); addSelected(photo.id) } }
        >
            <i className="fa fa-check-circle photo-check"/>
            <a href="#" >
                <img src={url} alt="Some image"  width="280"/>
            </a>
        </li>
    )
}

export default Photo