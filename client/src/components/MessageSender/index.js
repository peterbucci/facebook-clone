import React, { useState } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import VideocamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import './styles/message_sender.css'

import NewAvatar from 'components/Avatar/'

import { useStateValue } from 'providers/StateProvider'
import { useApiUtil } from 'providers/ApiUtil';

function MessageSender({ wallId }) {
  const { state: { user, users, posts } } = useStateValue()
  const currentUser = users[user]
  const profilePicData = posts[currentUser.profilePic]
  const {addNewPost} = useApiUtil()
  const [input, setInput] = useState('')
  const [imageURL, setImageURL] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    addNewPost(currentUser.id, wallId, firebase.firestore.FieldValue.serverTimestamp(), input, imageURL)
    setInput('')
    setImageURL('')
  }

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <NewAvatar profilePicData={profilePicData} />
        <form>
          <input
            value={input}
            onChange={({ target }) => setInput(target.value)}
            className="messageSender__input"
            placeholder={`What's on your mind, ${currentUser.firstName}?`}
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
