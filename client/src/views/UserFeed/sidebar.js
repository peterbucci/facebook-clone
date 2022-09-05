import React from 'react'
import SidebarRow from './sidebar_row'
import './styles/sidebar.css'

import { useStateValue } from '../../providers/StateProvider'

function Sidebar() {
  const { state: {user} } = useStateValue()
  
  return (
    <div className="sidebar">
      <SidebarRow pictureId={user.profilePic} title={`${user.firstName} ${user.lastName}`} />
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
  )
}

export default Sidebar
