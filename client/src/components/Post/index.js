import React from "react";
// CSS
import "./styles/post.css";
// COMPONENTS
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter/";

function Post({ post, users, comments, idx }) {
  const {
    image,
    message,
    timestamp,
    userId,
    wallId,
    type,
    thumbnail,
  } = post;
  const postFontSize =
    type === "Profile Picture" || message.length >= 85 ? " small-font" : "";

  return (
    <div className="post" key={post.id}>
      <PostHeader
        originalPoster={users[userId]}
        currentWall={users[wallId]}
        postType={type}
        timestamp={timestamp}
      />

      <div className={`post__body${postFontSize}`}>
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
        usersInPost={users}
        commentsInPost={comments}
      />
    </div>
  );
}

export default Post;
