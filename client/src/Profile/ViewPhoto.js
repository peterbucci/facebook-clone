import React, { useState } from 'react'
import { Link } from "react-router-dom"
// ICONS
import CloseIcon from '@material-ui/icons/Close'
import './ViewPhoto.css'
// COMPONENTS
import NewAvatar from '../common/Avatar'
import PostHeader from '../common/PostHeader'

function ViewPhoto({
  modalRef,
  closeAllMenus,
  pictureData,
  user
}) {
  const { type, timestamp } = pictureData
  return (
    <div className="profilePhoto__viewPicture">
      <div className="viewPicture__left">
        <div className="viewPicture__leftHeader">
          <CloseIcon onClick={closeAllMenus} />
        </div>
        <div ref={modalRef} className="viewPicture__leftBody">
          <img src={`/profile_pictures/${pictureData.image}`} alt="" />
        </div>
      </div>
      <div className="viewPicture__right">
        <div className="viewPicture__rightHeader"></div>
        <PostHeader
          originalPoster={user}
          timestamp={timestamp}
        />
        <div>
          {pictureData.message}
        </div>
      </div>
    </div>
  )
}

export default ViewPhoto
