import React, { useState, useEffect } from "react";
import { storage } from "firebase.js";
import { useHistory, useLocation } from "react-router-dom";
// CSS
import "./styles/post.css";
// COMPONENTS
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter/";

const storageRef = storage.ref("images");

function Post({
  post,
  commentsInPost,
  commentUsers,
  commentUserPics,
  author,
  authorPic,
  wall,
  feedRef,
  currentUser,
  currentUserPic,
}) {
  const [imageURL, setImageURL] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const { image, message, timestamp, type, subtype, thumbnail } = post;
  const postFontSize =
    type === "Photo" || message.length >= 85 ? " small-font" : "";

  useEffect(() => {
    thumbnail &&
      storageRef
        .child(thumbnail)
        .getDownloadURL()
        .then((url) => setImageURL(url))
        .catch((e) => console.log(e));
  }, [thumbnail]);

  const handleViewPhoto = (e) => {
    const appRef = document.getElementsByClassName("app")[0];
    history.push(`/photo?uid=${post.userId}&pid=${post.id}`, {
      referred: location.pathname,
      scrollToY: window.scrollY,
      height: appRef.offsetHeight,
    });
  };

  return (
    <div className="post" key={post.id}>
      <PostHeader
        profilePicData={authorPic}
        originalPoster={author}
        currentWall={wall}
        actionKey={subtype}
        timestamp={timestamp}
      />

      <div className={`post__body${postFontSize}`}>
        <p>{message}</p>
      </div>

      {image && (
        <div className="post__image" onClick={handleViewPhoto}>
          <img src={imageURL} alt="" />
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
