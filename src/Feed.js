import React from 'react'
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import Post from './Post'
import './Feed.css'

function Feed() {
  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />

      <Post 
        profilePic="./avatar.png"
        message="This is a post."
        timestamp="Timestamp"
        username="Brotgils"
        image="./portalIn.jpeg"
      />
      <Post 
        profilePic="./avatar.png"
        message="This is another post."
        timestamp="Timestamp"
        username="Brotgils"
        image="./portalOut.jpeg"
      />
      <Post 
        profilePic="./avatar.png"
        message="This is the final post."
        timestamp="Timestamp"
        username="Brotgils"
      />
    </div>
  )
}

export default Feed
