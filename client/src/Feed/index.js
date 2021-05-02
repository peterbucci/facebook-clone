import React, { useState, useEffect } from 'react'
import './index.css'

// COMPONENTS
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import VideoFeed from './VideoFeed'
import Post from './Post'

// FIREBASE
import db from '../firebase'

import { useStateValue } from '../StateProvider'

const WallPosts = ({
  posts,
  comments, 
  usersWhoContributed
}) => {
  return (
    posts.map(post => {
      const commentsInPost = comments.filter(comment => comment.postId === post.id).reduce((comments, comment) => {
        return {
          data: [...comments.data, comment],
          users: {
          ...comments.users,
          [comment.userId]: usersWhoContributed[comment.userId]
        
        }}
      }, {data: [], users: {}})

      const usersInPost = {
        [post.userId]: usersWhoContributed[post.userId],
        ...post.reactions.like.reduce((users, id) => {
          return {
            ...users,
            [id]: usersWhoContributed[id]
          }
        }, {}),
        ...commentsInPost.users
      }

      return Object.values(usersInPost).some(user => !user)
      ? <></>
      : <Post 
          key={post.id}
          post={post}
          usersInPost={usersInPost}
          commentsInPost={commentsInPost.data}
        />
    })
  )
}

function Feed() {
  const [{ user }] = useStateValue()
  const [posts, setPosts] = useState([])
  const [usersWhoContributed, setUsersWhoContributed] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    db.collectionGroup('wallPosts').where('userId', '==', user.id)
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const retrievedPosts = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })

        setPosts(retrievedPosts)
      })
      
  }, [])

  useEffect(() => {
    const postId = posts.map(post => post.id)
    postId.length > 0 && db.collectionGroup('comments')
      .where('postId', 'in', postId)
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        const updatedComments = snapshot.docs.map(doc => {
          console.log(doc.data())
          return {
            id: doc.id,
            ...doc.data()
          }
        })

        setComments(updatedComments)
      })
  }, [posts])

  useEffect(() => {
    const users = posts
      .reduce((users, post) => {
        return [...users, post.userId, ...post.reactions.like, ...comments.map(comment => comment.userId)]
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
  }, [comments, posts])

  return (
    <div className="feed">
      <div className="feed__container">
        <StoryReel />
        <MessageSender />
        <VideoFeed />
        <WallPosts 
          posts={posts}
          comments={comments}
          usersWhoContributed={usersWhoContributed}
        />
        <div className="feed__noMorePosts">
          <h3>No More Posts</h3>
          <p>Add more friends to see more posts in your News Feed</p>
          <button>Find Friends</button>
        </div>
      </div>
    </div>
  )
}

export default Feed
