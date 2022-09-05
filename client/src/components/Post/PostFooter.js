import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import firebase from "firebase/app";
import "firebase/firestore";
// ICONS
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import ReplyIcon from '@material-ui/icons/Reply'
// COMPONENTS
import NewAvatar from '../../components/Avatar/'

import { useApiUtil } from '../../providers/ApiUtil'

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}))

function PostFooter({
  idx,
  post,
  user,
  iconActive,
  commentsInPost,
  usersInPost,
  formatTimeStamp
}) {
  const { handleReactionClick, addNewComment, getSingleCommentFeed } = useApiUtil()
  const [commentsCollapsed, setCommentsCollapsed] = useState(true)
  const { reactions } = post
  const classes = useStyles()
  const [comment, setComment] = useState("");
  const aggregateCount = commentsInPost
    ? commentsInPost[commentsInPost.length - 1].aggregateCount
    : null
  console.log(commentsInPost)
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addNewComment(user.id, post.id, comment, firebase.firestore.FieldValue.serverTimestamp(), aggregateCount)
    setComment("");
  };

  const handleCommentFeedExpand = () => {
    setCommentsCollapsed(false)
    getSingleCommentFeed(post.id)
  }
  
  return <div>
    <div className="post__bottom">
      {reactions.like.length > 0 && <div className="post__reactions">          
        <ThumbUpIcon style={{fontSize: "small"}} className="likeIcon" /> 
        <p className="reactionCount">{reactions.like.length}</p>
      </div>}
      <div className="post__engagements">

      </div>
    </div>

    <div className="post__options">
      <button className="post__option" onClick={() => handleReactionClick(reactions, 'like', user.id, post, idx)}>
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

    {commentsInPost && <div className="post__comments">
      {commentsCollapsed && aggregateCount - commentsInPost.length > 0 && 
        <div onClick={handleCommentFeedExpand}>View {aggregateCount - commentsInPost.length} previous comments</div>}
      {commentsInPost.map((comment, i) => {
        const user = usersInPost[comment.userId]
        return (
          <div className="post__comment" key={comment.id}>
            <Link to={`/${user.url}`}><NewAvatar pictureId={user.profilePic} className={`${classes.small} comment__avatar`} /></Link>
            <div className="post__comment__body">
              <h4><Link to={`/${user.url}`}>{`${user.firstName} ${user.lastName}`}</Link></h4>
              <p>{comment.message}</p>
              <ul className="comment__interaction">
                <li>Like</li>
                <li>Reply</li>
                <li>{formatTimeStamp(comment.timestamp.seconds)}</li>
              </ul>
            </div>
        </div>
        )
      })}
    </div>}

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
  </div>
}

export default PostFooter
