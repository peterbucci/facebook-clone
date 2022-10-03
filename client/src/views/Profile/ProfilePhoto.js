import React, { useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./styles/profile_photo.css";
import UploadPhotoForm from "components/UploadPhotoForm";
import BackgroundIcon from "common/icons/BackgroundIcon";
import useOutsideAlerter from "common/icons/use_outside_alerter";
import DropdownMenu from "components/DropdownMenu";
import ProfileAvatar from "./ProfileAvatar";

function ProfilePhoto({ user, currentProfile, currentProfilePic }) {
  const location = useLocation();
  const history = useHistory();
  const [toggleUploadPhotoForm, setToggleUploadPhotoForm] = useState(false);

  const modalRef = useRef(null);
  const closeAllMenus = () => setToggleUploadPhotoForm(false);
  useOutsideAlerter(modalRef, closeAllMenus);

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
            <BackgroundIcon image="nnebAkjFy_c" position={[0, -84]} />
          ),
        },
        "Update profile picture": {
          onClick: () => setToggleUploadPhotoForm(!toggleUploadPhotoForm),
          Icon: () => (
            <BackgroundIcon image="fgWwJT0JD-x" position={[0, -406]} />
          ),
        },
      }
    : {
        "Add Photo": {
          onClick: () => setToggleUploadPhotoForm(!toggleUploadPhotoForm),
          Icon: () => (
            <BackgroundIcon image="nnebAkjFy_c" position={[0, -21]} />
          ),
        },
      };

  return user === currentProfile.id ? (
    <>
      {toggleUploadPhotoForm && (
        <UploadPhotoForm closeAllMenus={closeAllMenus} modalRef={modalRef} />
      )}
      <DropdownMenu
        listItems={listItems}
        width={344}
        left={1}
        align="center"
        customContainerClass="header__profilePhoto"
        customMenuClass="profilePhoto__menu"
        customButton={(handleClick, buttonRef) => (
          <ProfileAvatar
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
      <ProfileAvatar
        user={user}
        currentProfile={currentProfile}
        setToggleUploadPhotoForm={setToggleUploadPhotoForm}
        profilePic={currentProfilePic}
        handleClick={currentProfilePic ? handleViewPhoto : null}
      />
    </div>
  );
}

export default ProfilePhoto;
