import React, { useState, useEffect } from 'react'
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import Post from './Post'
import './Feed.css'

import db from './firebase'

function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        // As you map posts get the users who have posted.
        const usersWhoPosted = {}
        const updatedPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setPosts(updatedPosts)
      })
  }, [])

  console.log(posts)

  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />

      {posts.map(post => (
        <Post 
          key={post.id}
          timestamp={post.timestamp}
          message={post.message}
          image={post.image}
          username={post.username}
          profilePic={post.profilePic}
        />
      ))}
    </div>
  )
}

export default Feed
