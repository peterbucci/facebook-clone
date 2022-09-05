import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./index.css";
// COMPONENTS
import Feed from "../UserFeed/Feed";
import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import Bio from "./Bio";
// FIREBASE
import db from "../../firebase";

function Profile() {
  const [initialRender, setInitialRender] = useState(true)
  const [currentProfile, setCurrentProfile] = useState(null);
  let { profileURL } = useParams();

  useEffect(() => {
    db.collection("users")
      .where("url", "==", profileURL)
      .get()
      .then((res) => {
        const userData = res.docs[0].data();
        const profile = db.collection("users").doc(userData.id);

        if (userData.profilePic) {
          profile
            .collection("posts")
            .doc(userData.profilePic)
            .get()
            .then((res) => {
              setCurrentProfile({
                ...userData,
                profilePicData: res.data(),
              });
              setInitialRender(false)
            });
        } else {
          setCurrentProfile({
            ...userData,
          });
          setInitialRender(false)
        }
      });
  }, [profileURL]);

  return initialRender ? (
    <></>
  ) : (
    <div className="profile">
      <div className="profile_wrapper">
        <div className="profile__header">
          <CoverPhoto currentProfile={currentProfile} />
          <ProfilePhoto currentProfile={currentProfile} />

          <h1 className="header__name">
            {currentProfile.firstName} {currentProfile.lastName}
          </h1>
          <Bio currentBio={currentProfile.bio} userId={currentProfile.id} />

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
          <Feed page='userWall' user={currentProfile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

