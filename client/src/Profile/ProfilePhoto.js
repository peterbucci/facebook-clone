import React, { useState, useRef, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import './ProfilePhoto.css'

import UploadPhotoForm from './UploadPhotoForm'
import { useStateValue } from '../StateProvider'

function useOutsideAlerter(ref, closeAllMenus) {
  useEffect(() => {
      // Alert if clicked on outside of element
      function handleClickOutside(event) {
        console.log(ref.current, event.target)
          if (ref.current === event.target) {
            closeAllMenus()
          }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref, closeAllMenus]);
}

function ProfilePhoto() {
  const [{ currentProfile }] = useStateValue()
  const [toggleProfilePhotoMenu, setToggleProfilePhotoMenu] = useState(false)
  const [toggleViewProfilePicture, setToggleViewProfilePicture] = useState(false)
  const [toggleUploadPhotoForm, setToggleUploadPhotoForm] = useState(false)

  const closeAllMenus = () => {
    setToggleProfilePhotoMenu(false)
    setToggleUploadPhotoForm(false)
    setToggleViewProfilePicture(false)
  }

  const modalRef = useRef(null)
  useOutsideAlerter(modalRef, closeAllMenus)    

  return (
    <div className="header__profilePhoto">
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<CameraAltIcon className="profilePhoto__updateBadge" onClick={() => setToggleUploadPhotoForm(true)} />}
      >
      <Avatar className="profilePhoto__image" src={currentProfile.profilePic ? `/profile_pictures/${currentProfile.profilePicData.thumbnail}` : null} onClick={() => setToggleProfilePhotoMenu(!toggleProfilePhotoMenu)}>
        <img src="./default_avatar.png" />
      </Avatar>
    </Badge>

    {toggleProfilePhotoMenu && <div className="modalBackground" ref={modalRef}>
      <div className="profilePhoto__menu">
        <ul>
          {currentProfile.profilePic && <li onClick={() => setToggleViewProfilePicture(!toggleViewProfilePicture)}><WallpaperIcon /> View Profile Picture</li>}
          <li onClick={() => setToggleUploadPhotoForm(!toggleUploadPhotoForm)}><CameraAltOutlinedIcon /> Add Photo</li>
          <li><WallpaperIcon /> Add a Frame</li>
        </ul>
      </div>
    </div>}

    {toggleViewProfilePicture && <div className="profilePhoto__viewPicture">
      <div className="viewPicture__left">
        <div className="viewPicture__leftHeader">
          <CloseIcon onClick={closeAllMenus} />
        </div>
        <div ref={modalRef} className="viewPicture__leftBody">
          <img src={currentProfile.profilePic ? `/profile_pictures/${currentProfile.profilePicData.picture}` : null} />
        </div>
      </div>
      <div className="viewPicture__right">
        <div className="viewPicture__rightHeader"></div>
      </div>
    </div>}

    {toggleUploadPhotoForm && <UploadPhotoForm 
      closeAllMenus={closeAllMenus} 
      modalRef={modalRef}
    />}
    </div>
  )
}

export default ProfilePhoto
