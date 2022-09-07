import React, { useState } from "react";
import { Link } from "react-router-dom";
// CSS
import "./styles/post_footer.css";
// ICONS
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// COMPONENTS
import NewAvatar from "components/Avatar/";
// DATABASE
import { useApiUtil } from "providers/ApiUtil";

function Comments({
  post,
  user,
  commentsInPost,
  usersInPost,
  formatTimeStamp,
  aggregateCount,
  classes,
}) {
  const { handleReactionClick, getSingleCommentFeed } = useApiUtil();
  const [commentsCollapsed, setCommentsCollapsed] = useState(true);

  const handleCommentFeedExpand = () => {
    setCommentsCollapsed(false);
    getSingleCommentFeed(post.id, commentsInPost[0].timestamp);
  };

  return (
    <div className="post__comments">
      <div className="post__comments_expand" onClick={handleCommentFeedExpand}>
        {commentsCollapsed && aggregateCount - commentsInPost.length > 0 && (
          <p>View {aggregateCount - commentsInPost.length} previous comments</p>
        )}
      </div>

      {commentsInPost.map((comment, idx2) => {
        const commentUser = usersInPost[comment.userId];
        return (
          <div className="post__comment" key={comment.id}>
            <Link to={`/${commentUser.url}`}>
              <NewAvatar
                pictureId={commentUser.profilePic}
                className={`${classes.small} comment__avatar`}
              />
            </Link>
            <div>
              <div className="post__comment__body">
                <h4>
                  <Link
                    to={`/${commentUser.url}`}
                  >{`${commentUser.firstName} ${commentUser.lastName}`}</Link>
                </h4>
                <p>{comment.message}</p>

                {comment.reactions.like.length > 0 && (
                  <div className="post__reactions comment__reactions">
                    <ThumbUpIcon
                      style={{ fontSize: "small" }}
                      className="likeIcon"
                    />
                    <p className="reactionCount">
                      {comment.reactions.like.length}
                    </p>
                  </div>
                )}
              </div>

              <ul className="comment__interaction">
                <li
                  className={
                    comment.reactions.like.indexOf(user.id) >= 0
                      ? "comment__liked"
                      : ""
                  }
                  onClick={() =>
                    handleReactionClick(
                      comment.reactions,
                      "like",
                      user.id,
                      post,
                      idx2,
                      "comments",
                      comment
                    )
                  }
                >
                  Like
                </li>
                <li>Reply</li>
                <li className="comment__interaction_timestamp">
                  {formatTimeStamp(comment.timestamp.seconds)}
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
