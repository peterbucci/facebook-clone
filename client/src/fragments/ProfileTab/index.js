import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./styles/profile_tab.css";
import About from "./About";
import Photos from "./Photos";
import Friends from "./Friends";
import Videos from "./Videos";
import CheckIns from "./CheckIns";

function ProfileTab({ currentProfile, currentProfilePic, posts, path }) {
  const containerRef = useRef(null);
  const history = useHistory();
  const height = history.location.state?.height;
  const style = height ? { height } : {};

  return (
    <div
      className="profile_tab profile_wrapper"
      ref={containerRef}
      style={style}
    >
      {path.startsWith("about") && <About path={path} />}
      {path.startsWith("friends") && <Friends path={path} />}
      {(path.startsWith("about") ||
        path.startsWith("friends") ||
        path.startsWith("photos")) && (
        <Photos
          path={path}
          userId={currentProfile.id}
          containerRef={containerRef}
        />
      )}
      {path.startsWith("videos") && <Videos path={path} />}
      {path.startsWith("map") && <CheckIns path={path} />}
    </div>
  );
}

export default ProfileTab;
