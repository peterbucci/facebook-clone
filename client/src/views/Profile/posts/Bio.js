import React, { useState } from 'react'
import PublicIcon from '@material-ui/icons/Public';
import '../styles/bio.css'
// FIREBASE
import db from 'firebase.js'

function Bio({
  currentUser,
  userBio,
  userId
}) {
  const [editBio, setEditBio] = useState(false)
  const [newBio, setNewBio] = useState(userBio)

  const handleSubmit = e => {
    e.preventDefault()

    db.collection('users').doc(userId.trim()).set({
      bio: newBio
    }, { merge: true })

    setEditBio(false)
  }

  return (
    <div className="header__bio">
      {editBio
        ? <>
          <textarea
            className="bio__editText"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            rows={3}
          />
          <p className="bio__charRemaining">
            {101 - newBio.length} characters remaining
          </p>
          <div className="bio__editFooter">
            <span><PublicIcon className="icon__privacy" /> Public</span>
            <button
              className="cancel"
              onClick={() => {
                setNewBio(userBio)
                setEditBio(false)
              }}
            >
              Cancel
            </button>
            <button 
              className="submit"
              disabled={userBio === newBio}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </>
        : <>
          <p className="bio__text">{userBio}</p>
          {userId === currentUser && <span className="sidebar_container_button bio__editButton" onClick={() => setEditBio(true)}>{userBio ? 'Edit bio' : 'Add bio'}</span>}
        </>
      }

    </div>
  )
}

export default Bio
