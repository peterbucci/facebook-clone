import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import "./styles/profile.css";
// COMPONENTS
import CoverPhoto from "./CoverPhoto";
import StickyHeaderMenu from "./StickyHeaderMenu";
import { scrollToTop } from "common/scroll_to_top";
import ProfilePosts from "fragments/ProfilePosts";
import ProfileTab from "fragments/ProfileTab";
import ProfilePhoto from "./ProfilePhoto";
// STATE
import { useStateValue } from "providers/StateProvider";
import { useApiUtil } from "providers/ApiUtil";

function Profile() {
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

  useEffect(() => {
    if (currentProfile)
      document.title =
        currentProfile.firstName +
        " " +
        currentProfile.lastName +
        " | Facebook";
    return () => (document.title = "Facebook");
  }, [currentProfile]);

  return !currentProfile || profileURL !== currentProfile.url ? (
    <></>
  ) : (
    <div className="profile">
      <div className="profile__header">
        <CoverPhoto currentProfile={currentProfile} />
        <div className="profile_wrapper">
          <div className="header__name_container">
            <ProfilePhoto
              user={user}
              currentProfile={currentProfile}
              currentProfilePic={currentProfilePic}
            />
            <h1 className="header__name">
              {currentProfile.firstName} {currentProfile.lastName}
            </h1>
          </div>
        </div>
      </div>

      <StickyHeaderMenu
        user={user}
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
          user={user}
          currentProfile={currentProfile}
          currentProfilePic={currentProfilePic}
          posts={posts}
          path={path}
        />
      )}
    </div>
  );
}

export default Profile;
