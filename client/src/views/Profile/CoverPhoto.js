import React from 'react'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import './CoverPhoto.css'
// STATE
import { useStateValue } from '../../providers/StateProvider'

function CoverPhoto({ currentProfile }) {
  const { state: {user} } = useStateValue()
  return (
    <div className="header__coverPhoto">
        {currentProfile.id === user.id && <button> 
          <CameraAltIcon /> Add Cover Photo
        </button>}
    </div>
  )
}

export default CoverPhoto
