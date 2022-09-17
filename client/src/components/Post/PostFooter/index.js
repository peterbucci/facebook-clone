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

function PostFooter({ post, expandComments }) {
  const {
    state: { user, users, posts, commentOrder, comments },
  } = useStateValue();
  const currentUser = users[user];
  const { reactions } = post;
  const classes = useStyles();
  const iconActive = reactions.like.indexOf(currentUser.id) >= 0 ? "blue" : "";
  const commentIds = commentOrder[post.id];
  const commentsInPost = commentIds ? commentIds.map((id) => comments[id]) : null;
  const aggregateCount = commentsInPost
    ? commentsInPost[0].aggregateCount
    : null;

  return (
    <div className="post__footer">
      {(reactions.like.length > 0 || commentsInPost) && (
        <Counters reactions={reactions} aggregateCount={aggregateCount} />
      )}

      <Options post={post} userId={currentUser.id} iconActive={iconActive} />

      {commentsInPost && (
        <Comments
          post={post}
          user={currentUser}
          formatTimeStamp={formatTimeStamp}
          aggregateCount={aggregateCount}
          classes={classes}
          expandComments={expandComments}
          commentsInPost={commentsInPost}
        />
      )}

      <CommentSender
        posts={posts}
        post={post}
        user={currentUser}
        aggregateCount={aggregateCount}
        avatarClass={classes.small}
      />
    </div>
  );
}

export default PostFooter;
