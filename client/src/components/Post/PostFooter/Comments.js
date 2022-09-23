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
  currentUser,
  formatTimeStamp,
  aggregateCount,
  classes,
  expandComments,
  commentsInPost,
  commentUsers,
  commentUserPics,
}) {
  const { handleReactionClick, getSingleCommentFeed } = useApiUtil();
  const [commentsCollapsed, setCommentsCollapsed] = useState(!expandComments);
  const commentsToRender =
    commentsCollapsed && commentsInPost.length
      ? [commentsInPost[commentsInPost.length - 1]]
      : commentsInPost;

  const handleCommentFeedExpand = () => {
    setCommentsCollapsed(false);
    aggregateCount !== commentsInPost.length &&
      getSingleCommentFeed(
        post.id,
        commentsInPost[commentsInPost.length - 1].timestamp,
        "UPDATE_COMMENTS"
      );
  };

  return (
    <div className="post__comments">
      <div className="post__comments_expand" onClick={handleCommentFeedExpand}>
        {commentsCollapsed && aggregateCount - 1 !== 0 && (
          <p>View {aggregateCount - 1} previous comments</p>
        )}
      </div>

      {commentsToRender.map((comment, i) => {
        const commentUser = commentUsers[i];
        return (
          <div className="post__comment" key={comment.id}>
            <Link
              to={{
                pathname: `/${commentUser.url}`,
                state: { uid: commentUser.id },
              }}
            >
              <NewAvatar
                profilePicData={commentUserPics[i]}
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
                  <div className={`post__reactions comment__reactions${comment.message.length < 13 ? "_short" : ""}`}>
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
                    comment.reactions.like.indexOf(currentUser.id) >= 0
                      ? "comment__liked"
                      : ""
                  }
                  onClick={() =>
                    handleReactionClick(
                      comment.reactions,
                      "like",
                      currentUser.id,
                      post,
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
