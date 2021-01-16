import React, { useState, useEffect } from 'react'
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import Post from './Post'
import './Feed.css'

import db from './firebase'

function Feed() {
  const [posts, setPosts] = useState([])
  const [usersWhoContributed, setUsersWhoContributed] = useState({})

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const updatedPosts = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        setPosts(updatedPosts)
      })
  }, [])

  useEffect(() => {
    const users = posts
      .map(post => post.authId)
      .filter((authId, index, self) => self.indexOf(authId) === index)
    
    if (users.length > 0) {
      db.collection('users')
      .where('authId', 'in', users)
      .onSnapshot(snapshot => {
        const updatedUsers = snapshot.docs.reduce((users, user) => {
          return {
            ...users,
            [user.data().authId]: user.data()
          }
        }, {})

        setUsersWhoContributed(updatedUsers)
      })
    }
  }, [posts])

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
          username={(usersWhoContributed[post.authId] ? usersWhoContributed[post.authId].firstName : '')}
          profilePic={(usersWhoContributed[post.authId] ? usersWhoContributed[post.authId].profilePic : '')}
        />
      ))}
    </div>
  )
}

export default Feed
