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
import { useStateValue } from "providers/StateProvider";

function Comments({
  post,
  user,
  formatTimeStamp,
  aggregateCount,
  classes,
  expandComments,
  commentsInPost,
}) {
  const { handleReactionClick, getSingleCommentFeed } = useApiUtil();
  const {
    state: { posts, users },
  } = useStateValue();
  const [commentsCollapsed, setCommentsCollapsed] = useState(!expandComments);
  const commentsToRender =
    commentsCollapsed && commentsInPost.length
      ? [commentsInPost[0]]
      : commentsInPost;

  const handleCommentFeedExpand = () => {
    setCommentsCollapsed(false);
    aggregateCount !== commentsInPost.length &&
      getSingleCommentFeed(post.id, commentsInPost[0].timestamp, "UPDATE_COMMENTS");
  };

  return (
    <div className="post__comments">
      <div className="post__comments_expand" onClick={handleCommentFeedExpand}>
        {commentsCollapsed && aggregateCount - 1 !== 0 && (
          <p>View {aggregateCount - 1} previous comments</p>
        )}
      </div>

      {commentsToRender.map((comment) => {
        const commentUser = users[comment.userId];
        return (
          <div className="post__comment" key={comment.id}>
            <Link
              to={{
                pathname: `/${commentUser.url}`,
                state: { uid: commentUser.id },
              }}
            >
              <NewAvatar
                profilePicData={posts[commentUser.profilePic]}
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
