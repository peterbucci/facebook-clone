import React, { useState, useEffect } from 'react'
// COMPONENTS
import Post from './Post'
// API
import { getSnapshot } from './APIUtils'

function PostList({
  postFilter
}) {
  const [posts, setPosts] = useState([])
  const [usersWhoContributed, setUsersWhoContributed] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    getSnapshot({
      collection: 'posts',
      filter: postFilter,
      order: ['timestamp', 'desc'],
      setState: setPosts
    })
  }, [])

  useEffect(() => {
    const postId = posts.map(post => post.id)
    postId.length > 0 && getSnapshot({
      collection: 'comments',
      filter: ['postId', 'in', postId],
      order: ['timestamp', 'asc'],
      setState: setComments
    })
  }, [posts])

  useEffect(() => {
    const users = posts.reduce((users, post) => {
      return [...users, post.userId, ...post.reactions.like, ...comments.map(comment => comment.userId)]
    }, [])
      .filter((userId, index, self) => self.indexOf(userId) === index)
    
    if (users.length > 0) {
      getSnapshot({
        collection: 'users',
        filter: ['id', 'in', users],
        setState: setUsersWhoContributed,
        useReduce: true
      })
    }
  }, [comments, posts])

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
          action={post.type == 'Profile Picture' ? 'updated their profile picture.' : ''}
        />
    })
  )
}

export default PostList
