import React from 'react'
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import NearMeIcon from '@material-ui/icons/NearMe'
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined'
import './Post.css'

import db from './firebase'
import { useStateValue } from './StateProvider'

function Post({
  post,
  usersInPost
}) {
  const [{ user }] = useStateValue()
  const { id, image, message, reactions, timestamp, userId} = post
  const originalPoster = usersInPost[userId]
  console.log(originalPoster)

  const handleReactionClick = (type) => {
    console.log(reactions, type, user.id, reactions[type].indexOf(user.id))
    const newReactionsObj = reactions[type].indexOf(user.id) >= 0
      ? {
        ...reactions,
        [type]: reactions[type].filter(reaction => reaction !== user.id)
      }
      : {
        ...reactions,
        [type]: [...reactions[type], user.id]
      }
    

    console.log(newReactionsObj)
    db.collection('posts')
      .doc(id)
      .set({
        ...post,
        reactions: newReactionsObj
      })
  }

  return (
    <div className="post">
        <div className="post__top">
          <Avatar src={originalPoster.profilePic} className="post__avatar" />
          <div className="post__topInfo">
            <h3>{originalPoster.firstName}</h3>
            <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
          </div>
        </div>

        <div className="post__bottom">
          <p>{message}</p>
        </div>

        {image && <div className="post__image">
            <img src={image} alt="" />
        </div>}

        <div className="post__options">
          <button className="post__option" onClick={() => handleReactionClick('like')}>
            <ThumbUpIcon />
            <p>Like</p>
          </button>
          <div className="post__option">
            <ChatBubbleOutlineIcon />
            <p>Comment</p>
          </div>
          <div className="post__option">
            <NearMeIcon />
            <p>Share</p>
          </div>
          <div className="post__option">
            <AccountCircleIcon />
            <ExpandMoreOutlined />
          </div>
        </div>
    </div>
  )
}

export default Post
