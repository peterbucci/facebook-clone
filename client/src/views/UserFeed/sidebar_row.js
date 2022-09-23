import React from 'react'
import './styles/sidebar_row.css'
import { Avatar } from '@material-ui/core'

import NewAvatar from '../../components/Avatar'

function SidebarRow({ currentUserPic, Icon, title }) {
  return (
    <div className="sidebarRow">
      {Icon 
        ? <img src={`./icons/${Icon}.png`} alt="" />
        : <NewAvatar profilePicData={currentUserPic} />
      }
      <h4>{title}</h4>
    </div>
  )
}

export default SidebarRow
