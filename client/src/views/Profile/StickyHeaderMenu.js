import React, { useRef } from "react";
import NewAvatar from "components/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function StickyHeaderMenu({ currentProfilePic, currentProfile, scrollToTop }) {
  const containerRef = useRef(null);
  const sticky = containerRef.current?.getBoundingClientRect().top === 52;

  return (
    <div className="sticky_wrapper" ref={containerRef}>
      <div className="profile_wrapper">
        {sticky ? (
          <div className="sticky__nav">
            <div className="sticky__nav_left" onClick={scrollToTop}>
              <NewAvatar
                profilePicData={currentProfilePic}
                className="sticky__nav_avatar"
              />
              <span className="sticky__nav_name">
                {currentProfile.firstName} {currentProfile.lastName}
              </span>
            </div>
            <div className="sticky__nav_right">More</div>
          </div>
        ) : (
          <ul className="header__nav">
            <li className="active">Posts</li>
            <li>About</li>
            <li>Friends</li>
            <li>Photos</li>
            <li>
              More <ArrowDropDownIcon />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default StickyHeaderMenu;
