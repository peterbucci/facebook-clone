import React from 'react'
import { Avatar } from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './index.css'

import Bio from './Bio'

function Profile({
  user
}) {
  console.log(user)
  return (
    <div className="profile">
      <div className="profile__header">

        <div className="header__coverPhoto">
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={<CameraAltIcon className="avatar__update" />}
          >
            <Avatar className="header__avatar">
              <img src="./default_avatar.png" />
            </Avatar>
          </Badge>
          <div className="coverPhoto__add">
            <Button
              startIcon={<CameraAltIcon />}
            > 
              Add Cover Photo
            </Button>
          </div>
        </div>

        <h1 className="header__name">{user.firstName} {user.lastName}</h1>
        <Bio 
          currentBio={user.bio}
          userId={user.id}
        />


        <ul className="header__nav">
          <li className="active">Posts</li>
          <li>About</li>
          <li>Friends</li>
          <li>Photos</li>
          <li>More <ArrowDropDownIcon /></li>
        </ul>
      </div>
    </div>
  )
}

export default Profile
