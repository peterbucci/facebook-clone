import React, { useState, useEffect } from 'react'
import './index.css'

// COMPONENTS
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import Post from './Post'

// FIREBASE
import db from '../firebase'

function Feed() {
  const [posts, setPosts] = useState([])
  const [usersWhoContributed, setUsersWhoContributed] = useState({})
  const [comments, setComments] = useState([])

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
    posts.forEach(post => {
      db.collection('posts').doc(post.id)
        .collection('comments')
        .where('parent', '==', null)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              console.log(doc.id, " => ", doc.data());
          });
      })
    })

    const postIds = posts.map(post => post.id)
    postIds.length > 0 && db.collection('comments')
      .where('postId', 'in', postIds)
      .onSnapshot(snapshot => {
        const updatedComments = snapshot.docs.map(doc => {
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
      <StoryReel />
      <MessageSender />

      {posts.map(post => {
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
      })}
    </div>
  )
}

export default Feed
