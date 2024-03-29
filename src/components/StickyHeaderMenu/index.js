import React, { useRef, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import NewAvatar from "components/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./styles/sticky_header_menu.css";
import DropdownMenu from "components/DropdownMenu";
import BackgroundIcon from "common/icons/BackgroundIcon";
import TabNavigator from "components/TabNavigator";

function StickyHeaderMenu({
  user,
  currentProfilePic,
  currentProfile,
  scrollToTop,
}) {
  const containerRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const location = useLocation();
  const splitPath = location.pathname.split("/");
  const path = splitPath[splitPath.length - 1];

  useLayoutEffect(() => {
    const container = containerRef.current;
    const isHeaderSticky = () =>
      setSticky(container.getBoundingClientRect().top === 52);
    isHeaderSticky();
    window.addEventListener("scroll", isHeaderSticky);
    return () => window.removeEventListener("scroll", isHeaderSticky);
  }, []);

  const dropdownListItems =
    user === currentProfile.id
      ? {
          "View As": {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="eye" />,
          },
          Search: {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="magnify" />,
          },
          "Account Status": {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="account" />,
          },
          Archive: {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="box" />,
          },
          "Story archive": {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="clock" />,
          },
          "Activity logs": {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="unorderedList" />,
          },
          "Profile and tagging settings": {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="profileSettings" />,
          },
        }
      : {
          Search: {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="magnify" />,
          },
          "Find support or report": {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="support" />,
          },
          Block: {
            onClick: "photos",
            Icon: () => <BackgroundIcon icon="profileBlock" />,
          },
        };

  const tabNavigatorListItems = {
    [currentProfile.url]: {
      text: "Posts",
      onClick: "/" + currentProfile.url,
      secondaryKeys: [""],
    },
    about: {
      text: "About",
      onClick: "/" + currentProfile.url + "/about",
    },
    friends: {
      text: "Friends",
      additionalClasses: "friends",
      onClick: "/" + currentProfile.url + "/friends",
    },
    photos: {
      text: "Photos",
      additionalClasses: "photos",
      onClick: "/" + currentProfile.url + "/photos",
    },
    videos: {
      text: "Videos",
      additionalClasses: "videos",
      onClick: "/" + currentProfile.url + "/videos",
    },
    map: {
      text: "Check-ins",
      additionalClasses: "map",
      onClick: "/" + currentProfile.url + "/map",
    },
    more: {
      text: "More",
      additionalClasses: "more",
      Icon: ArrowDropDownIcon,
      onClick: () => console.log(true),
    },
  };

  const isActive = (key, secondaryKeys) => {
    return (
      (secondaryKeys &&
        secondaryKeys.findIndex((key) => key === path) !== -1) ||
      (path === "" && key === "") ||
      path.startsWith(key)
    );
  };

  return (
    <div className="sticky_wrapper" ref={containerRef}>
      <div className="profile_wrapper header_nav">
        <div
          className="profile_header_nav_left tab_navigator"
          onClick={scrollToTop}
        >
          {sticky ? (
            <div className="profile_header_sticky_nav_left">
              <NewAvatar
                profilePicData={currentProfilePic}
                className="sticky__nav_avatar"
              />
              <span className="sticky__nav_name">
                {currentProfile.firstName} {currentProfile.lastName}
              </span>
            </div>
          ) : (
            <>
              <TabNavigator
                listItems={tabNavigatorListItems}
                active={isActive}
              />
            </>
          )}
        </div>
        <div className="profile_header_nav_right">
          <DropdownMenu
            listItems={dropdownListItems}
            listOrder={
              user === currentProfile.id
                ? [
                    "View As",
                    "Search",
                    "Account Status",
                    "Archive",
                    "Story archive",
                    "Activity logs",
                    "Profile and tagging settings",
                  ]
                : ["Search", "Find support or report", "Block"]
            }
            align="right"
            width={344}
          />
        </div>
      </div>
    </div>
  );
}

export default StickyHeaderMenu;
