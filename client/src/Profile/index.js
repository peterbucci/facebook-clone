import React, { useEffect } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './index.css'

import CoverPhoto from './CoverPhoto'
import ProfilePhoto from './ProfilePhoto'
import Bio from './Bio'

import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'
import db from '../firebase'

function Profile({
  id
}) {
  const [{ currentProfile }, dispatch] = useStateValue()

  useEffect(() => {
    if (currentProfile.initialRender) {
      const profile = db.collection('users').doc(id)
      profile.get()
        .then(res => {
          const userData = res.data()
          profile.collection('pictures')
            .doc(userData.profilePic)
            .get().then((res => {
              dispatch({
                type: actionTypes.SET_CURRENT_PROFILE,
                currentProfile: {
                  ...userData,
                  profilePicData: res.data()
                }
              })
            }))
        })
    }
  }, [id, currentProfile])

  return (
    <div className="profile">
      <div className="profile__header">
        <CoverPhoto />
        <ProfilePhoto />

        <h1 className="header__name">{currentProfile.firstName} {currentProfile.lastName}</h1>
        <Bio 
          currentBio={currentProfile.bio}
          userId={currentProfile.id}
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
