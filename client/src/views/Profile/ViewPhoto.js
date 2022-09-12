import React, { useState, useEffect } from "react";
// ICONS
import CloseIcon from "@material-ui/icons/Close";
import "./styles/view_photo.css";
// COMPONENTS
import PostHeader from "components/Post/PostHeader";
import PostFooter from "../../components/Post/PostFooter";

function ViewPhoto({
  modalRef,
  closeAllMenus,
  currentProfilePic,
  currentProfile,
}) {
  const [usersInPost, setUsersInPost] = useState(null);
  const [commentsInPost, setCommentsInPost] = useState(null);

  useEffect(() => {}, []);

  return (
    <div className="profilePhoto__viewPicture">
      <div className="viewPicture__left">
        <div className="viewPicture__leftHeader">
          <CloseIcon onClick={closeAllMenus} />
        </div>
        <div ref={modalRef} className="viewPicture__leftBody">
          <img
            src={`http://localhost:3001/images/${currentProfilePic.image}`}
            alt=""
          />
        </div>
      </div>
      <div className="viewPicture__right">
        <div className="viewPicture__rightHeader"></div>
        <PostHeader
          originalPoster={currentProfile}
          currentWall={currentProfile}
          timestamp={currentProfilePic.timestamp}
        />
        <div className={`post__body small-font`}>
          <p>{currentProfilePic.message}</p>
        </div>
        <PostFooter
            post={currentProfilePic}
            usersInPost={usersInPost}
            commentsInPost={commentsInPost}
          />
      </div>
    </div>
  );
}

export default ViewPhoto;
