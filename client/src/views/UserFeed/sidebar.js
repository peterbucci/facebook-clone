import React from "react";
import SidebarRow from "./sidebar_row";
import "./styles/sidebar.css";

function Sidebar({ currentUser, currentUserPic}) {
  return (
    <div className="sidebar">
      <SidebarRow
        currentUserPic={currentUserPic}
        title={`${currentUser.firstName} ${currentUser.lastName}`}
      />
      <SidebarRow Icon="findFriends" title="Find Friends" />
      <SidebarRow Icon="mostRecent" title="Most Recent" />
      <SidebarRow Icon="favorites" title="Favorites" />
      <SidebarRow Icon="groups" title="Groups" />
      <SidebarRow Icon="marketplace" title="Marketplace" />
      <SidebarRow Icon="watch" title="Watch" />
      <SidebarRow Icon="events" title="Events" />
      <SidebarRow Icon="memories" title="Memories" />
      <SidebarRow Icon="saved" title="Saved" />
      <SidebarRow Icon="findFriends" title="See More" />
    </div>
  );
}

export default Sidebar;
