import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './index.css'
// COMPONENTS
import CoverPhoto from './CoverPhoto'
import ProfilePhoto from './ProfilePhoto'
import Bio from './Bio'
// FIREBASE
import db from '../firebase'
// STATE
import { useStateValue } from '../StateProvider'

function Profile() {
  const [{ user }] = useStateValue()
  const [currentProfile, setCurrentProfile] = useState({ initialRender: true })
  let { profileURL } = useParams()

  useEffect(() => {
    if (currentProfile.initialRender) {
      db.collection('users').where('url', '==', profileURL)
        .get().then(res => {
          const userData = res.docs[0].data()
          const profile = db.collection('users').doc(userData.id)

          if (userData.profilePic) {
            profile.collection('posts')
            .doc(userData.profilePic)
            .get().then((res => {
              setCurrentProfile({
                  ...userData,
                  profilePicData: res.data(),
                  initialRender: false
                })
            }))
          } else {
            setCurrentProfile({
              ...userData,
              initialRender: false
            })
          }
         
        })
    }
  }, [currentProfile, useParams])

  return (currentProfile.initialRender
    ? <></>
    : <div className="profile">
      <div className="profile__header">
        <CoverPhoto currentProfile={currentProfile} />
        <ProfilePhoto currentProfile={currentProfile} />

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
