import React from 'react'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// ICONS
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import ReplyIcon from '@material-ui/icons/Reply'
// CSS
import './Post.css'

import db from '../firebase'
import { useStateValue } from '../StateProvider'

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}))

function Post({
  post,
  usersInPost,
  commentsInPost
}) {
  const [{ user }] = useStateValue()
  const { id, image, message, reactions, timestamp, userId} = post
  const originalPoster = usersInPost[userId]
  const classes = useStyles()

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

    db.collection('posts')
      .doc(id)
      .set({
        ...post,
        reactions: newReactionsObj
      })
  }

  const iconActive = reactions.like.indexOf(user.id) >= 0 ? 'blue' : ''

  // commentsInPost.forEach(comment => console.log(usersInPost[comment.userId]))

  return (
    <div className="post">
        <div className="post__top">
          <Avatar src={originalPoster.profilePic} className="post__avatar" />
          <div className="post__topInfo">
            <h3>{`${originalPoster.firstName} ${originalPoster.lastName}`}</h3>
            <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
          </div>
        </div>

        <div className="post__body">
          <p>{message}</p>
        </div>

        {image && <div className="post__image">
            <img src={image} alt="" />
        </div>}

        <div className="post__bottom">
          {reactions.like.length > 0 && <div className="post__reactions">          
            <ThumbUpIcon style={{fontSize: "small"}} className="likeIcon" /> 
            <p className="reactionCount">{reactions.like.length}</p>
          </div>}
          <div className="post__engagements">

          </div>
        </div>

        <div className="post__options">
          <button className="post__option" onClick={() => handleReactionClick('like')}>
            <ThumbUpIcon className={iconActive} />
            <p className={iconActive}>Like</p>
          </button>
          <div className="post__option">
            <ChatBubbleOutlineIcon />
            <p>Comment</p>
          </div>
          <div className="post__option">
            <ReplyIcon className="shareIcon" />
            <p>Share</p>
          </div>
        </div>

        <div className="post__comments">
          {commentsInPost.map(comment => {
            const user = usersInPost[comment.userId]
            return <div className="post__comment">
              <Avatar src={user.profilePic} className={`${classes.small} comment__avatar`} />
              <div className="post__comment__body">
                <h4>{`${user.firstName} ${user.lastName}`}</h4>
                <p>{comment.message}</p>
              </div>
            </div>
          })}
        </div>

        <div className="post__commentSender">
          <Avatar src={originalPoster.profilePic} className={`${classes.small} commentSender__avatar`} />
          <form>
            <input
              className="commentSender__input"
              placeholder="Write a comment..."
            />
            <button onClick={() => {}} type="submit">
              Hidden submit
            </button>
        </form>
        </div>
    </div>
  )
}

export default Post
