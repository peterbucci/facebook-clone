import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import "./styles/profile.css";
// COMPONENTS
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import ProfilePhotoMenu from "./ProfilePhotoMenu";
import StickyHeaderMenu from "./StickyHeaderMenu";
import { scrollToTop } from "common/scroll_to_top";
import UploadPhotoForm from "components/UploadPhotoForm";
// STATE
import { useStateValue } from "providers/StateProvider";
import { useApiUtil } from "providers/ApiUtil";

import ProfilePosts from "fragments/ProfilePosts";
import ProfileTab from "fragments/ProfileTab";
import ScrollOnMount from "common/ScrollOnMount";

function useOutsideAlerter(ref, closeAllMenus) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current === event.target) {
        closeAllMenus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeAllMenus]);
}

function ProfileWrapper() {
  const {
    state: { user, users, posts },
  } = useStateValue();
  const { getProfile } = useApiUtil();
  const { profileURL } = useParams();
  const history = useHistory();
  const prevUser = users[history.location.state?.uid];
  const prevProfilePic = posts[prevUser?.profilePic];
  const [currentProfile, setCurrentProfile] = useState(prevUser);
  const [currentProfilePic, setCurrentProfilePic] = useState(prevProfilePic);

  const location = useLocation();
  const splitPath = location.pathname.split("/");
  const path = splitPath[splitPath.length - 1];

  useEffect(() => {
    if (!currentProfile || profileURL !== currentProfile.url) {
      getProfile(profileURL).then(({ user, pic }) => {
        setCurrentProfile(user);
        setCurrentProfilePic(pic);
      });
    }
  }, [profileURL, getProfile, currentProfile]);

  const [toggleProfilePhotoMenu, setToggleProfilePhotoMenu] = useState(false);
  const [toggleUploadPhotoForm, setToggleUploadPhotoForm] = useState(false);
  const [profilePhotoPos, setProfilePhotoPos] = useState([0, 0]);

  const scrollToY = history.location.state?.scrollToY;

  useEffect(() => {
    window.history.replaceState(null, "");
    scrollToTop("auto");
    
  }, []);

  useEffect(() => {
    if (currentProfile)
      document.title =
        currentProfile.firstName +
        " " +
        currentProfile.lastName +
        " | Facebook";
    return () => (document.title = "Facebook");
  }, [currentProfile]);

  const closeAllMenus = () => {
    setToggleProfilePhotoMenu(false);
    setToggleUploadPhotoForm(false);
  };

  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, closeAllMenus);

  return !currentProfile || profileURL !== currentProfile.url ? (
    <></>
  ) : (
    <div className="profile">
      {scrollToY && <ScrollOnMount x={0} y={scrollToY} />}
      {toggleProfilePhotoMenu &&
        !(user !== currentProfile.id && !currentProfile.profilePic) && (
          <ProfilePhotoMenu
            currentProfile={currentProfile}
            userId={user}
            setToggleUploadPhotoForm={setToggleUploadPhotoForm}
            toggleUploadPhotoForm={toggleUploadPhotoForm}
            modalRef={modalRef}
            top={profilePhotoPos[0]}
            left={profilePhotoPos[1]}
          />
        )}
      {toggleUploadPhotoForm && (
        <UploadPhotoForm closeAllMenus={closeAllMenus} modalRef={modalRef} />
      )}
      <div className="profile__header">
        <CoverPhoto currentProfile={currentProfile} />
        <div className="profile_wrapper">
          <div className="header__name_container">
            <ProfilePhoto
              user={user}
              currentProfile={currentProfile}
              profilePic={currentProfilePic}
              toggleProfilePhotoMenu={toggleProfilePhotoMenu}
              setToggleProfilePhotoMenu={setToggleProfilePhotoMenu}
              setToggleUploadPhotoForm={setToggleUploadPhotoForm}
              setProfilePhotoPos={setProfilePhotoPos}
            />
            <h1 className="header__name">
              {currentProfile.firstName} {currentProfile.lastName}
            </h1>
          </div>
        </div>
      </div>

      <StickyHeaderMenu
        currentProfilePic={currentProfilePic}
        currentProfile={currentProfile}
        scrollToTop={() => scrollToTop()}
      />

      {path === currentProfile.url || path === "" ? (
        <ProfilePosts
          currentProfile={currentProfile}
          currentProfilePic={currentProfilePic}
        />
      ) : (
        <ProfileTab
          currentProfile={currentProfile}
          currentProfilePic={currentProfilePic}
          posts={posts}
          path={path}
        />
      )}
    </div>
  );
}

export default ProfileWrapper;
