import React from "react";
import { useHistory, useLocation } from "react-router-dom";
// CSS
import "./styles/post.css";
// COMPONENTS
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter/";

const { REACT_APP_PHOTOS_FOLDER } = process.env;

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
  const location = useLocation();
  const { image, message, timestamp, type, thumbnail } = post;
  const postFontSize =
    type === "Profile Picture" || message.length >= 85 ? " small-font" : "";


  const handleViewPhoto = (e) => {
    console.log(location.pathname)
    history.push(`/photo?uid=${post.userId}&pid=${post.id}`, {
      referred: location.pathname,
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
            <img src={REACT_APP_PHOTOS_FOLDER + thumbnail} alt="" />
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
