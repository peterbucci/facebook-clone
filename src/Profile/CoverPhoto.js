import React from 'react'
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import './CoverPhoto.css'

function CoverPhoto() {
  return (
    <div className="header__coverPhoto">
        <button> 
          <CameraAltIcon /> Add Cover Photo
        </button>
    </div>
  )
}

export default CoverPhoto
