import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./styles/profile.css";
// COMPONENTS
import PostFeed from 'components/PostFeed'
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import Bio from "./Bio";
import { useApiUtil } from "providers/ApiUtil";

function Profile({ history }) {
  const state = history.location.state
  const [currentUser, setCurrentUser] = useState(state?.user)
  const [currentProfilePic, setCurrentProfilePic] = useState(state?.pic)
  const [title, setTitle] = useState(state?.user ? state.user.firstName + " " + state.user.lastName : null)

  const { getProfile } = useApiUtil();
  let { profileURL } = useParams();

  useEffect(() => {
    if (title) document.title = title + " | Facebook"
    return () => document.title = "Facebook"
  }, [title])

  useEffect(() => {
    window.history.replaceState(null, '')
  }, [])

  useEffect(() => {
    if(!currentUser || profileURL !== currentUser.url) {
      getProfile(profileURL).then((profile) => {
        setCurrentProfilePic(profile.pic)
        setCurrentUser(profile.user)
        setTitle(profile.user.firstName + " " + profile.user.lastName)
      })
    }
  }, [profileURL, getProfile, currentUser]);

  return !currentUser || profileURL !== currentUser.url
    ?
      <></>
    : (
    <div className="profile">
      <div className="profile_wrapper">
        <div className="profile__header">
          <CoverPhoto currentProfile={currentUser} />
          <ProfilePhoto 
            currentProfile={currentUser} 
            profilePic={currentProfilePic} 
          />

          <h1 className="header__name">
            {currentUser.firstName} {currentUser.lastName}
          </h1>
          <Bio currentBio={currentUser.bio} userId={currentUser.id} />

          <ul className="header__nav">
            <li className="active">Posts</li>
            <li>About</li>
            <li>Friends</li>
            <li>Photos</li>
            <li>
              More <ArrowDropDownIcon />
            </li>
          </ul>
        </div>
        <div className="profile_body">
          <div className="profile_body_left_col">
          </div>
          <div className="profile_body_right_col">
          <PostFeed page='userWall' user={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;