import React from 'react'
import './styles/sidebar_row.css'

import NewAvatar from '../../common/Avatar'

function SidebarRow({ pictureId, Icon, title }) {
  return (
    <div className="sidebarRow">
      {Icon 
        ? <img src={`./icons/${Icon}.png`} alt="" />
        : <NewAvatar pictureId={pictureId} />
      }
      <h4>{title}</h4>
    </div>
  )
}

export default SidebarRow
