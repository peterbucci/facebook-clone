import React from 'react'
import './SidebarRow.css'

import NewAvatar from './common/Avatar'

function SidebarRow({ pictureId, Icon, title }) {
  return (
    <div className="sidebarRow">
      {Icon 
        ? <img src={`./icons/${Icon}.png`} />
        : <NewAvatar pictureId={pictureId} />
      }

      <h4>{title}</h4>
    </div>
  )
}

export default SidebarRow
