import React from "react";
import { useHistory } from "react-router-dom";
// CSS
import "./styles/post.css";
// COMPONENTS
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter/";

function Post({
  post,
  commentsInPost,
  commentUsers,
  commentUserPics,
  author,
  authorPic,
  wall,
  feedRef,
  page,
  currentUser,
  currentUserPic,
}) {
  const history = useHistory();
  const { image, message, timestamp, type, thumbnail } = post;
  const postFontSize =
    type === "Profile Picture" || message.length >= 85 ? " small-font" : "";

  const handleViewPhoto = (e) => {
    history.push(`/photo?uid=${post.userId}&pid=${post.id}`, {
      referred: page === "userWall" ? wall.url : "/",
      scrollToY: window.scrollY,
      height: feedRef.current.offsetHeight,
    });
  };

  return (
    <div className="post" key={post.id}>
      <PostHeader
        profilePicData={authorPic}
        originalPoster={author}
        currentWall={wall}
        postType={type}
        timestamp={timestamp}
      />

      <div className={`post__body${postFontSize}`}>
        <p>{message}</p>
      </div>

      {image && (
        <div className="post__image" onClick={handleViewPhoto}>
          {type === "Wall Post" && <img src={image} alt="" />}
          {type === "Profile Picture" && (
            <img src={`http://localhost:3001/images/${thumbnail}`} alt="" />
          )}
        </div>
      )}

      <PostFooter
        post={post}
        commentsInPost={commentsInPost}
        commentUsers={commentUsers}
        commentUserPics={commentUserPics}
        currentUser={currentUser}
        currentUserPic={currentUserPic}
      />
    </div>
  );
}

export default Post;
