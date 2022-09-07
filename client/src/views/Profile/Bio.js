import React, { useState } from 'react'
import PublicIcon from '@material-ui/icons/Public';
import './styles/bio.css'
// FIREBASE
import db from 'firebase.js'
// STATE
import { useStateValue } from 'providers/StateProvider'

function Bio({
  currentBio,
  userId
}) {
  const { state: {user} } = useStateValue()
  const [editBio, setEditBio] = useState(false)
  const [newBio, setNewBio] = useState(currentBio)

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
                setNewBio(currentBio)
                setEditBio(false)
              }}
            >
              Cancel
            </button>
            <button 
              className="submit"
              disabled={currentBio === newBio}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </>
        : <>
          <p className="bio__text">{currentBio}</p>
          {userId === user.id && <span className="bio__editButton" onClick={() => setEditBio(true)}>{currentBio ? 'Edit' : 'Add Bio'}</span>}
        </>
      }

    </div>
  )
}

export default Bio
