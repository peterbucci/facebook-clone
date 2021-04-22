import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './index.css'

import CoverPhoto from './CoverPhoto'
import ProfilePhoto from './ProfilePhoto'
import Bio from './Bio'

function Profile({
  user
}) {
  return (
    <div className="profile">
      <div className="profile__header">
        <CoverPhoto />
        <ProfilePhoto />

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
