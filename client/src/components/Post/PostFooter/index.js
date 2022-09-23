import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// CSS
import "./styles/post_footer.css";
// COMPONENTS
import Comments from "./Comments";
import Counters from "./Counters";
import Options from "./Options";
import CommentSender from "./CommentSender";
import { formatTimeStamp } from "common/format_timestamp";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function PostFooter({
  post,
  commentsInPost,
  commentUsers,
  commentUserPics,
  currentUser,
  currentUserPic,
  expandComments
}) {
  const { reactions } = post;
  const classes = useStyles();
  const iconActive = reactions.like.indexOf(currentUser.id) >= 0 ? "blue" : "";

  const aggregateCount = commentsInPost.length > 0 
    ? commentsInPost[commentsInPost.length - 1].aggregateCount
    : null;

  return (
    <div className="post__footer">
      {(reactions.like.length > 0 || commentsInPost.length > 0 ) && (
        <Counters reactions={reactions} aggregateCount={aggregateCount} />
      )}

      <Options post={post} userId={currentUser.id} iconActive={iconActive} />

      {commentsInPost.length > 0 && (
        <Comments
          post={post}
          currentUser={currentUser}
          formatTimeStamp={formatTimeStamp}
          aggregateCount={aggregateCount}
          classes={classes}
          expandComments={expandComments}
          commentsInPost={commentsInPost}
          commentUsers={commentUsers}
          commentUserPics={commentUserPics}
        />
      )}

      <CommentSender
        currentUserPic={currentUserPic}
        post={post}
        user={currentUser}
        aggregateCount={aggregateCount}
        avatarClass={classes.small}
      />
    </div>
  );
}

export default PostFooter;
