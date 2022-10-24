import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./styles/profile_photo_dropdown.css";
import UploadPhotoForm from "components/UploadPhotoForm";
import BackgroundIcon from "common/icons/BackgroundIcon";
import DropdownMenu from "components/DropdownMenu";
import PhotoThumbnail from "./PhotoThumbnail";

function ProfilePhotoDropdown({ user, currentProfile, currentProfilePic }) {
  const location = useLocation();
  const history = useHistory();
  const [toggleUploadPhotoForm, setToggleUploadPhotoForm] = useState(false);
  const closeAllMenus = () => setToggleUploadPhotoForm(false);

  const handleViewPhoto = () => {
    const appRef = document.getElementsByClassName("app")[0];
    history.push(
      `/photo?uid=${currentProfile.id}&pid=${currentProfile.profilePic}`,
      {
        referred: location.pathname,
        scrollToY: window.scrollY,
        height: appRef.offsetHeight,
      }
    );
  };

  const listItems = currentProfilePic
    ? {
        "View profile picture": {
          onClick: handleViewPhoto,
          Icon: () => (
            <BackgroundIcon
              icon="profilePic"
              image="nnebAkjFy_c"
              position={[0, -84]}
            />
          ),
        },
        "Update profile picture": {
          onClick: () => setToggleUploadPhotoForm(!toggleUploadPhotoForm),
          Icon: () => (
            <BackgroundIcon
              icon="photos"
              image="fgWwJT0JD-x"
              position={[0, -406]}
            />
          ),
        },
      }
    : {
        "Add Photo": {
          onClick: () => setToggleUploadPhotoForm(!toggleUploadPhotoForm),
          Icon: () => <BackgroundIcon icon="camera" />,
        },
      };

  return user === currentProfile.id ? (
    <>
      {toggleUploadPhotoForm && (
        <UploadPhotoForm closeAllMenus={closeAllMenus} />
      )}
      <DropdownMenu
        listItems={listItems}
        listOrder={
          currentProfilePic
            ? ["View profile picture", "Update profile picture"]
            : ["Add Photo"]
        }
        width={344}
        left={1}
        align="center"
        customContainerClass="header__profilePhoto"
        customMenuClass="profilePhoto__menu"
        customButton={(handleClick, buttonRef) => (
          <PhotoThumbnail
            user={user}
            currentProfile={currentProfile}
            setToggleUploadPhotoForm={setToggleUploadPhotoForm}
            profilePic={currentProfilePic}
            handleClick={handleClick}
            buttonRef={buttonRef}
          />
        )}
      />
    </>
  ) : (
    <div className="header__profilePhoto">
      <PhotoThumbnail
        user={user}
        currentProfile={currentProfile}
        setToggleUploadPhotoForm={setToggleUploadPhotoForm}
        profilePic={currentProfilePic}
        handleClick={currentProfilePic ? handleViewPhoto : null}
      />
    </div>
  );
}

export default ProfilePhotoDropdown;