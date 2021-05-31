import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
// ICONS
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import ReplyIcon from '@material-ui/icons/Reply'
// COMPONENTS
import NewAvatar from './Avatar'

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}))

function PostFooter({
  post,
  postRef,
  user,
  iconActive,
  commentsInPost,
  usersInPost,
  handleCommentSubmit
}) {
  const [comment, setComment] = useState('')

  const { id, image, message, reactions, timestamp, userId, type, thumbnail} = post
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

      postRef.set({
        ...post,
        reactions: newReactionsObj
      })
  }
  
  return <>
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
        <Link to={`/${user.url}`}><NewAvatar pictureId={user.profilePic} className={`${classes.small} comment__avatar`} /></Link>
          <div className="post__comment__body">
            <h4><Link to={`/${user.url}`}>{`${user.firstName} ${user.lastName}`}</Link></h4>
            <p>{comment.message}</p>
          </div>
        </div>
      })}
    </div>

    <div className="post__commentSender">
      <NewAvatar pictureId={user.profilePic} className={`${classes.small} commentSender__avatar`} />
      <form>
        <input
          className="commentSender__input"
          placeholder="Write a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={handleCommentSubmit} type="submit">
          Hidden submit
        </button>
      </form>
    </div>
  </>
}

export default PostFooter
