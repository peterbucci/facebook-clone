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
      .reduce((users, post) => {
        return [...users, post.userId, ...post.reactions.like]
      }, [])
      .filter((userId, index, self) => self.indexOf(userId) === index)
    
    if (users.length > 0) {
      db.collection('users')
      .where('id', 'in', users)
      .onSnapshot(snapshot => {
        const updatedUsers = snapshot.docs.reduce((users, user) => {
          return {
            ...users,
            [user.data().id]: user.data()
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

      {posts.map(post => {
        const usersInPost = {
          [post.userId]: usersWhoContributed[post.userId],
          ...post.reactions.like.reduce((users, id) => {
            return {
              ...users,
              [id]: usersWhoContributed[id]
            }
          }, {})
        }

        return Object.values(usersInPost).some(user => !user)
        ? <></>
        : <Post 
            key={post.id}
            post={post}
            usersInPost={usersInPost}
          />
      })}
    </div>
  )
}

export default Feed
