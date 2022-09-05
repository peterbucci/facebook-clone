import React from "react";
// CSS
import "./styles/post.css";
// COMPONENTS
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
// STATE
import { useStateValue } from "../../providers/StateProvider";

function Post({ post, action, users, comments, idx }) {
  const { state: {user} } = useStateValue()
  const { image, message, reactions, timestamp, userId, wallId, type, thumbnail } = post;
  const iconActive = reactions.like.indexOf(user.id) >= 0 ? "blue" : "";

  const formatTimeStamp = (postTimestamp, type) => {
    const currentTimestamp = Math.round(Date.now() / 1000)
    const numberOfMinutes = (currentTimestamp - postTimestamp) / 60
    const numberOfHours = numberOfMinutes / 60
    const numberOfDays = numberOfHours / 24
    return numberOfMinutes < 1
      ? type === 'post' ? 'Just now' : '1m'
      : numberOfMinutes < 60
      ? Math.floor(numberOfMinutes) + 'm'
      : numberOfHours < 24
        ? Math.floor(numberOfHours) + 'h'
        : numberOfDays < 365
          ? Math.floor(numberOfDays) + 'd'
          : Math.floor(numberOfDays / 365) + 'y'
  }

  return (
    <div className="post" key={post.id}>
      <PostHeader
        originalPoster={users[userId]}
        action={action}
        timestamp={timestamp}
        wallId={wallId}
        currentWall={users[wallId]}
        formatTimeStamp={formatTimeStamp}
      />

      <div
        className={`post__body${
          type === "Profile Picture" || message.length >= 85
            ? " small-font"
            : ""
        }`}
      >
        <p>{message}</p>
      </div>

      {image && (
        <div className="post__image">
          {type === "Wall Post" && <img src={image} alt="" />}
          {type === "Profile Picture" && (
            <img src={`http://localhost:3001/images/${thumbnail}`} alt="" />
          )}
        </div>
      )}

      <PostFooter
        idx={idx}
        post={post}
        user={user}
        iconActive={iconActive}
        usersInPost={users}
        commentsInPost={comments}
        formatTimeStamp={formatTimeStamp}
      />
    </div>
  );
}

export default Post;
