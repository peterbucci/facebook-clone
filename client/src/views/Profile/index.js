import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./styles/profile.css";
// COMPONENTS
import PostFeed from "components/PostFeed";
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import ProfilePhotoMenu from "./ProfilePhotoMenu";
import StickyHeaderMenu from "./StickyHeaderMenu";
import { scrollToTop } from "common/scroll_to_top";
import UploadPhotoForm from "components/UploadPhotoForm";
// STATE
import { useStateValue } from "providers/StateProvider";
import { useApiUtil } from "providers/ApiUtil";
import BodySidebar from "./BodySidebar";

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

function Profile({ history }) {
  const {
    state: { user, users, posts, postOrder, comments, commentOrder, wallId },
  } = useStateValue();
  const { profileURL } = useParams();
  const prevUser = users[history.location.state?.uid];
  const prevProfilePic = posts[prevUser?.profilePic];
  const [currentProfile, setCurrentProfile] = useState(prevUser);
  const [currentProfilePic, setCurrentProfilePic] = useState(prevProfilePic);
  const [title, setTitle] = useState(
    currentProfile
      ? currentProfile.firstName + " " + currentProfile.lastName
      : null
  );

  const { getProfile } = useApiUtil();

  const [toggleProfilePhotoMenu, setToggleProfilePhotoMenu] = useState(false);
  const [toggleUploadPhotoForm, setToggleUploadPhotoForm] = useState(false);
  const [profilePhotoPos, setProfilePhotoPos] = useState([0, 0]);

  const closeAllMenus = () => {
    setToggleProfilePhotoMenu(false);
    setToggleUploadPhotoForm(false);
  };

  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, closeAllMenus);

  useEffect(() => {
    if (title) document.title = title + " | Facebook";
    return () => (document.title = "Facebook");
  }, [title]);

  useEffect(() => {
    window.history.replaceState(null, "");
    scrollToTop("auto");
  }, []);

  useEffect(() => {
    if (!currentProfile || profileURL !== currentProfile.url) {
      getProfile(profileURL).then(({ user, pic }) => {
        setCurrentProfile(user);
        setCurrentProfilePic(pic);
        setTitle(user.firstName + " " + user.lastName);
      });
    }
  }, [profileURL, getProfile, currentProfile]);

  return !currentProfile || profileURL !== currentProfile.url ? (
    <></>
  ) : (
    <div className="profile">
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

      <div className="profile_body profile_wrapper">
        <BodySidebar userId={user} currentProfile={currentProfile} />
        <div className="profile_body_right_col">
          <PostFeed
            page="userWall"
            currentUser={currentProfile}
            currentUserPic={currentProfilePic}
            users={users}
            posts={posts}
            postOrder={postOrder}
            comments={comments}
            commentOrder={commentOrder}
            wallId={wallId}
            containerClass="no_padding"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
