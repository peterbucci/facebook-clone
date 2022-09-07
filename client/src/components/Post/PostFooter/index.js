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
// STATE
import { useStateValue } from "providers/StateProvider";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function PostFooter({
  idx,
  post,
  commentsInPost,
  usersInPost,
}) {
  const {
    state: { user },
  } = useStateValue();
  const { reactions } = post;
  const classes = useStyles();
  const iconActive = post.reactions.like.indexOf(user.id) >= 0 ? "blue" : "";
  const aggregateCount = commentsInPost
    ? commentsInPost[commentsInPost.length - 1].aggregateCount
    : null;

  return (
    <div className="post__footer">
      {(reactions.like.length > 0 || commentsInPost) && (
        <Counters reactions={reactions} aggregateCount={aggregateCount} />
      )}

      <Options idx={idx} post={post} userId={user.id} iconActive={iconActive} />

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

      <CommentSender
        post={post}
        user={user}
        aggregateCount={aggregateCount}
        avatarClass={classes.small}
      />
    </div>
  );
}

export default PostFooter;
