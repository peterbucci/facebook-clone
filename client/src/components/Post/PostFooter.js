import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/firestore";
// CSS
import "./styles/post_footer.css";
// ICONS
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ReplyIcon from "@material-ui/icons/Reply";
// COMPONENTS
import NewAvatar from "../../components/Avatar/";
import Comments from "./Comments";

import { useApiUtil } from "../../providers/ApiUtil";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function PostFooter({
  idx,
  post,
  user,
  iconActive,
  commentsInPost,
  usersInPost,
  formatTimeStamp,
}) {
  const { handleReactionClick, addNewComment } = useApiUtil();
  const { reactions } = post;
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const aggregateCount = commentsInPost
    ? commentsInPost[commentsInPost.length - 1].aggregateCount
    : null;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addNewComment(
      post.userId,
      user.id,
      post.id,
      comment,
      firebase.firestore.FieldValue.serverTimestamp(),
      aggregateCount
    );
    setComment("");
  };

  return (
    <div className="post__footer">
      <div className="post__bottom">
        {reactions.like.length > 0 && (
          <div className="post__reactions">
            <ThumbUpIcon style={{ fontSize: "small" }} className="likeIcon" />
            <p className="reactionCount">{reactions.like.length}</p>
          </div>
        )}
        <div className="post__engagements"></div>
      </div>

      <div className="post__options">
        <button
          className="post__option"
          onClick={() =>
            handleReactionClick(reactions, "like", user.id, post, idx, "posts")
          }
        >
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

      {commentsInPost && (
        <Comments
          post={post}
          user={user}
          commentsInPost={commentsInPost}
          usersInPost={usersInPost}
          formatTimeStamp={formatTimeStamp}
          aggregateCount={aggregateCount}
          classes={classes}
        />
      )}

      <div className="post__commentSender">
        <NewAvatar
          pictureId={user.profilePic}
          className={`${classes.small} commentSender__avatar`}
        />
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
  );
}

export default PostFooter;
