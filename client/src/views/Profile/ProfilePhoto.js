import React, { useState, useRef, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import './styles/profile_photo.css'
// COMPONENTS
import UploadPhotoForm from '../../components/UploadPhotoForm'
import ViewPhoto from './ViewPhoto'
import { useStateValue } from '../../providers/StateProvider'

function useOutsideAlerter(ref, closeAllMenus) {
  useEffect(() => {
      // Alert if clicked on outside of element
      function handleClickOutside(event) {
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

function ProfilePhoto({ currentProfile }) {
  const { state: {user} } = useStateValue()
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
      {user.id === currentProfile.id 
        ? <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<CameraAltIcon className="profilePhoto__updateBadge" onClick={() => setToggleUploadPhotoForm(true)} />}
      >
      <Avatar 
          className="profilePhoto__image" 
          src={currentProfile.profilePic 
            ? `http://localhost:3001/images/${currentProfile.profilePicData.thumbnail}` 
            : null} 
          onClick={() => setToggleProfilePhotoMenu(!toggleProfilePhotoMenu)}
        >
          <img src="./default_avatar.png" alt="Default Avatar" />
        </Avatar>
    </Badge>
      : (
        <Avatar 
          className="profilePhoto__image" 
          src={currentProfile.profilePic 
            ? `http://localhost:3001/images/${currentProfile.profilePicData.thumbnail}` 
            : null} 
          onClick={() => setToggleProfilePhotoMenu(!toggleProfilePhotoMenu)}
        >
          <img src="./default_avatar.png" alt="Default Avatar" />
        </Avatar>
      )}

    {toggleProfilePhotoMenu && !(user.id !== currentProfile.id && !currentProfile.profilePic) && <div className="modalBackground" ref={modalRef}>
      <div className="profilePhoto__menu">
        <ul>
          {currentProfile.profilePic && <li onClick={() => setToggleViewProfilePicture(!toggleViewProfilePicture)}><WallpaperIcon /> View Profile Picture</li>}
          {user.id === currentProfile.id && <>
            <li onClick={() => setToggleUploadPhotoForm(!toggleUploadPhotoForm)}><CameraAltOutlinedIcon /> Add Photo</li>
            <li><WallpaperIcon /> Add a Frame</li>
          </>}
        </ul>
      </div>
    </div>}

    {toggleViewProfilePicture && 
      <ViewPhoto 
        modalRef={modalRef}
        closeAllMenus={closeAllMenus}
        pictureData={currentProfile.profilePicData}
        user={currentProfile}
      />}

    {toggleUploadPhotoForm && <UploadPhotoForm 
      closeAllMenus={closeAllMenus} 
      modalRef={modalRef}
    />}
    </div>
  )
}

export default ProfilePhoto
