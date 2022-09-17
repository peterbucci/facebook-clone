import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./styles/profile.css";
// COMPONENTS
import PostFeed from 'components/PostFeed'
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import Bio from "./Bio";
// STATE
import { useStateValue } from "providers/StateProvider";
import { useApiUtil } from "providers/ApiUtil";

function Profile({ history }) {
  const { state: { users, posts } } = useStateValue()
  const { profileURL } = useParams();
  const prevUser = users[history.location.state?.uid]
  const prevProfilePic = posts[prevUser?.profilePic]
  const [currentUser, setCurrentUser] = useState(prevUser)
  const [currentProfilePic, setCurrentProfilePic] = useState(prevProfilePic)
  const [title, setTitle] = useState(currentUser ? currentUser.firstName + " " + currentUser.lastName : null)

  const { getProfile } = useApiUtil();


  useEffect(() => {
    if (title) document.title = title + " | Facebook"
    return () => document.title = "Facebook"
  }, [title])

  useEffect(() => {
    window.history.replaceState(null, '')
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if(!currentUser || profileURL !== currentUser.url) {
      getProfile(profileURL).then(({ user, pic}) => {
        setCurrentUser(user)
        setCurrentProfilePic(pic)
        setTitle(user.firstName + " " + user.lastName)
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