import React from 'react'
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined';
import SidebarRow from './SidebarRow'
import './Sidebar.css'

import { useStateValue } from './StateProvider'

function Sidebar() {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className="sidebar">
      <SidebarRow src={user.profilePic} title={`${user.firstName} ${user.lastName}`} />
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