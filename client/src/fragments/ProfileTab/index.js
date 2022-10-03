import React, { useRef } from "react";
import "./styles/profile_tab.css";
import About from "./About/";
import Photos from "./Photos";
import Friends from "./Friends";
import Videos from "./Videos";
import CheckIns from "./CheckIns";

function ProfileTab({ user, currentProfile, currentProfilePic, posts, path }) {
  const containerRef = useRef(null);

  return (
    <div className="profile_tab profile_wrapper" ref={containerRef}>
      {path.startsWith("about") && (
        <About path={path} currentProfile={currentProfile} user={user} />
      )}
      {path.startsWith("friends") && <Friends path={path} />}
      {(path.startsWith("about") ||
        path.startsWith("friends") ||
        path.startsWith("photos")) && (
        <Photos
          path={path}
          userId={currentProfile.id}
          containerRef={containerRef}
          posts={posts}
        />
      )}
      {path.startsWith("videos") && <Videos path={path} />}
      {path.startsWith("map") && <CheckIns path={path} />}
    </div>
  );
}

export default ProfileTab;
