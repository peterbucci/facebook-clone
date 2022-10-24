import React, { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";
import "./styles/profile.css";
import "./styles/profile_tab.css";
// COMPONENTS
import CoverPhoto from "components/CoverPhoto";
import ProfilePhotoDropdown from "components/ProfilePhotoDropdown";
import StickyHeaderMenu from "components/StickyHeaderMenu";
import Posts from "./posts";
import About from "./about/";
import Photos from "./photos";
import Videos from "./videos";
import CheckIns from "./checkins";
import Friends from "./friends";
import { scrollToTop } from "common/scroll_to_top";
// STATE
import { useStateValue } from "providers/StateProvider";
import { useApiUtil } from "providers/ApiUtil";


const ABOUT_PATHS = [
  "about_overview",
  "about_work_and_education",
  "about_places",
  "about_contact_and_basic_info",
  "about_family_and_relationships",
  "about_details",
  "about_life_events",
  "about",
];

function Profile() {
  const {
    state: { user, users, posts },
  } = useStateValue();
  const { getProfile } = useApiUtil();
  const { profileURL } = useParams();
  const history = useHistory();
  const prevUser = users[history.location.state?.uid];
  const prevProfilePic = posts[prevUser?.profilePic];
  const match = useRouteMatch();
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
            <ProfilePhotoDropdown
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
      
      <div
        className={`${
          match.isExact ? "profile_body" : "profile_tab"
        } profile_wrapper`}
      >
        <Switch>
          <Route path={ABOUT_PATHS.map((path) => `${match.path}/${path}`)}>
            <About path={path} currentProfile={currentProfile} user={user} />
            <Photos path={path} userId={currentProfile.id} posts={posts} />
            <Videos />
            <CheckIns />
          </Route>
          <Route path={["friends"].map((path) => `${match.path}/${path}`)}>
            <Friends path={path} />
            <Photos path={path} userId={currentProfile.id} posts={posts} />
            <Videos />
            <CheckIns />
          </Route>
          <Route
            path={["photos", "photos_by", "photos_albums"].map(
              (path) => `${match.path}/${path}`
            )}
          >
            <Photos path={path} userId={currentProfile.id} posts={posts} />
            <Videos />
            <CheckIns />
          </Route>
          <Route path={["videos"].map((path) => `${match.path}/${path}`)}>
            <Videos />
            <CheckIns />
          </Route>
          <Route path={["map"].map((path) => `${match.path}/${path}`)}>
            <CheckIns />
          </Route>
          <Route path="">
            <Posts
              currentProfile={currentProfile}
              currentProfilePic={currentProfilePic}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Profile;
