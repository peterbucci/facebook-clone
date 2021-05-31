import React, { useState } from 'react'
import firebase from 'firebase'
// CSS
import './Post.css'
// COMPONENTS
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
// FIREBASE
import db from '../firebase'
// STATE
import { useStateValue } from '../StateProvider'

function Post({
  post,
  usersInPost,
  commentsInPost,
  action
}) {
  const [{ user }] = useStateValue()
  const { id, image, message, reactions, timestamp, userId, type, thumbnail} = post
  console.log(post)
  const originalPoster = usersInPost[userId]

  const [comment, setComment] = useState('')

  const postRef = db.collection('users')
    .doc(userId)
    .collection('posts')
    .doc(id)

  const handleReactionClick = (type) => {
    const newReactionsObj = reactions[type].indexOf(user.id) >= 0
      ? {
        ...reactions,
        [type]: reactions[type].filter(reaction => reaction !== user.id)
      }
      : {
        ...reactions,
        [type]: [...reactions[type], user.id]
      }

      postRef.set({
        ...post,
        reactions: newReactionsObj
      })
  }

  const handleCommentSubmit = e => {
    e.preventDefault()

    const newCommentRef = postRef.collection('comments').doc()
    newCommentRef.set({
      id: newCommentRef.id,
      image: '',
      message: comment,
      postId: post.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: user.id
    })

    setComment('')
  }

  const iconActive = reactions.like.indexOf(user.id) >= 0 ? 'blue' : ''

  return (
    <div className="post">
        <PostHeader
          originalPoster={originalPoster}
          action={action}
          timestamp={timestamp}
        />

        <div className={`post__body${type === 'Profile Picture' || message.length >= 85 ? ' small-font' : ''}`}>
          <p>{message}</p>
        </div>

        {image && <div className="post__image">
            {type === 'Wall Post' && <img src={image} alt="" />}
            {type === 'Profile Picture' && <img src={`/profile_pictures/${thumbnail}`} alt="" />}
        </div>}

        <PostFooter
          post={post}
          postRef={postRef}
          user={user}
          iconActive={iconActive}
          commentsInPost={commentsInPost}
          usersInPost={usersInPost}
          handleCommentSubmit={handleCommentSubmit}
        />
    </div>
  )
}

export default Post
