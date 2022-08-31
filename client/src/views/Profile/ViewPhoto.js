import React from 'react'
// ICONS
import CloseIcon from '@material-ui/icons/Close'
import './ViewPhoto.css'
// COMPONENTS
import PostHeader from '../../components/Post/PostHeader'

function ViewPhoto({
  modalRef,
  closeAllMenus,
  pictureData,
  user
}) {
  const { timestamp } = pictureData
  return (
    <div className="profilePhoto__viewPicture">
      <div className="viewPicture__left">
        <div className="viewPicture__leftHeader">
          <CloseIcon onClick={closeAllMenus} />
        </div>
        <div ref={modalRef} className="viewPicture__leftBody">
          <img src={`http://localhost:3001/images/${pictureData.image}`} alt="" />
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
