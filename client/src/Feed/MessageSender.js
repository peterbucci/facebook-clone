import React, { useState } from 'react'
import firebase from 'firebase'
import { Avatar } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './MessageSender.css'

import { useStateValue } from '../StateProvider'
import db from '../firebase'


function MessageSender() {
  const [{ user }] = useStateValue()
  const [input, setInput] = useState('')
  const [imageURL, setImageURL] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const newPost = db.collection('users')
      .doc(user.id)
      .collection('wallPosts')
      .doc()
    const id = newPost.id

    newPost.set({
      id,
      userId: user.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      image: imageURL,
      reactions: {
        like: []
      }
    })

    setInput('')
    setImageURL('')
  }

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.profilePic} />
        <form>
          <input
            value={input}
            onChange={({ target }) => setInput(target.value)}
            className="messageSender__input"
            placeholder={`What's on your mind, ${user.firstName}?`}
          />
          <input 
            value={imageURL}
            onChange={({ target }) => setImageURL(target.value)}
            placeholder="image URL (Optional)" 
          />

          <button onClick={handleSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  )
}

export default MessageSender
