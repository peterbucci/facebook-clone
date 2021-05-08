import React from 'react'

import Post from './Post'

function PostList({
  posts,
  comments, 
  usersWhoContributed
}) {
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

export default PostList
