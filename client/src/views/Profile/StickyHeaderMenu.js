import React, { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import NewAvatar from "components/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./styles/sticky_header_menu.css";

function StickyHeaderMenu({ currentProfilePic, currentProfile, scrollToTop }) {
  const containerRef = useRef(null);
  const sticky = containerRef.current?.getBoundingClientRect().top === 52;
  const location = useLocation();
  const splitPath = location.pathname.split("/");
  const path = splitPath[splitPath.length - 1];

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
            <div className="sticky__nav_right">
              <span className="profile_card_dropdown_button">
                <div className="profile_card_dropdown_button_text"></div>
              </span>
            </div>
          </div>
        ) : (
          <ul className="header__nav profile_header">
            <li
              className={
                path === currentProfile.url || path === "" ? "active" : ""
              }
            >
              <Link to={"/" + currentProfile.url}>Posts</Link>
            </li>
            <li className={path.startsWith("about") ? "active" : ""}>
              <Link to={"/" + currentProfile.url + "/about"}>About</Link>
            </li>
            <li className={path.startsWith("friends") ? "active" : ""}>
              <Link to={"/" + currentProfile.url + "/friends"}>Friends</Link>
            </li>
            <li className={path.startsWith("photos") ? "active" : ""}>
              <Link to={"/" + currentProfile.url + "/photos"}>Photos</Link>
            </li>
            <li
              className={`videos${path.startsWith("videos") ? " active" : ""}`}
            >
              <Link to={"/" + currentProfile.url + "/videos"}>Videos</Link>
            </li>
            <li className={`map${path.startsWith("map") ? " active" : ""}`}>
              <Link to={"/" + currentProfile.url + "/map"}>Check-ins</Link>
            </li>
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
