import React, { useState, useRef, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import WallpaperIcon from '@material-ui/icons/Wallpaper';

import './ProfilePhoto.css'

import UploadPhotoForm from './UploadPhotoForm'

function useOutsideAlerter(ref, closeAllMenus) {
  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
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
  const [toggleProfilePhotoMenu, setToggleProfilePhotoMenu] = useState(false)
  const [toggleUploadPhotoForm, setToggleUploadPhotoForm] = useState(false)

  const closeAllMenus = () => {
    setToggleProfilePhotoMenu(false)
    setToggleUploadPhotoForm(false)
  }

  const menuRef = useRef(null),
        modalRef = useRef(null)

  // useOutsideAlerter(menuRef, closeAllMenus)
  // useOutsideAlerter(modalRef, closeAllMenus)    

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
        <Avatar className="profilePhoto__image" onClick={() => setToggleProfilePhotoMenu(!toggleProfilePhotoMenu)}>
          <img src="./default_avatar.png" />
        </Avatar>
      </Badge>

      {toggleProfilePhotoMenu && <div className="profilePhoto__menu" ref={menuRef}>
        <ul>
          <li onClick={() => setToggleUploadPhotoForm(!toggleUploadPhotoForm)}><CameraAltOutlinedIcon /> Add Photo</li>
          <li><WallpaperIcon /> Add a Frame</li>
        </ul>
      </div>}

      {toggleUploadPhotoForm && <UploadPhotoForm closeAllMenus={closeAllMenus} />}
    </div>
  )
}

export default ProfilePhoto
