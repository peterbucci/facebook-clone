import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import "./styles/profile_photo.css";

function ProfilePhotoMenu({
  currentProfile,
  userId,
  setToggleUploadPhotoForm,
  toggleUploadPhotoForm,
  modalRef,
  top,
  left,
}) {
  const history = useHistory();
  const menuRef = useRef(null);

  const handleViewPhoto = () => {
    history.push(
      `/photo?uid=${currentProfile.id}&pid=${currentProfile.profilePic}`,
      {
        referred: currentProfile.url,
      }
    );
  };

  return (
    <div
      className="modalBackground"
      ref={modalRef}
      style={{ height: document.body.scrollHeight + "px" }}
    >
      <div className="profilePhoto__menu" style={{ top, left }} ref={menuRef}>
        <ul>
          {currentProfile.profilePic && (
            <li onClick={handleViewPhoto}>
              <WallpaperIcon /> View Profile Picture
            </li>
          )}
          {userId === currentProfile.id && (
            <>
              <li
                onClick={() => setToggleUploadPhotoForm(!toggleUploadPhotoForm)}
              >
                <CameraAltOutlinedIcon /> Add Photo
              </li>
              <li>
                <WallpaperIcon /> Add a Frame
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePhotoMenu;
