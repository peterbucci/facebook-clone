import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
// ICONS
import CloseIcon from "@material-ui/icons/Close";
import "./styles/photo.css";
// COMPONENTS
import PostHeader from "components/Post/PostHeader";
import PostFooter from "components/Post/PostFooter";
// STATE
import { useStateValue } from "providers/StateProvider";

import { useApiUtil } from "providers/ApiUtil";
import HeaderRight from "components/Header/MenuRight";

const { REACT_APP_PHOTOS_FOLDER } = process.env;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Photo({ history }) {
  const initalRender = useRef(true);
  const containerRef = useRef(null);
  const [referred] = useState(history.location.state?.referred);
  const [scrollToY] = useState(history.location.state?.scrollToY);
  const [height] = useState(history.location.state?.height);
  const { getProfile, getSingleCommentFeed } = useApiUtil();
  const {
    state: { user, users, posts, commentOrder, comments },
  } = useStateValue();
  const currentUser = users[user];
  const currentUserPic = posts[currentUser.profilePic];

  const query = useQuery();
  const pid = query.get("pid");
  const uid = query.get("uid");
  const currentPhoto = posts[pid];
  const userOfPhoto = users[uid];
  const userOfPhotoPic = posts[userOfPhoto.profilePic];

  const commentIds = commentOrder[currentPhoto?.id];
  const commentsInPost = commentIds ? commentIds.map((id) => comments[id]) : [];
  const commentUsers = commentsInPost.map((comment) => users[comment.userId]);
  const commentUserPics = commentUsers.map((user) => posts[user.profilePic]);

  const handleClose = () => history.push(referred, { scrollToY, height });

  useEffect(() => {
    window.history.replaceState(null, "");
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  useEffect(() => {
    if (!currentPhoto || (currentPhoto && pid !== currentPhoto.id))
      getProfile(null, uid, pid);
    if (initalRender.current) {
      const order = commentOrder[pid];
      const latestPost = order ? comments[order[order.length - 1]] : null;
      console.log(order, latestPost);
      initalRender.current = false;
      if (!order || latestPost?.aggregateCount !== order.length)
        getSingleCommentFeed(pid, latestPost?.timestamp, "UPDATE_COMMENTS");
    }
  }, [
    getProfile,
    pid,
    uid,
    currentPhoto,
    getSingleCommentFeed,
    commentOrder,
    comments,
  ]);

  return !currentPhoto ? (
    <></>
  ) : (
    <div
      className={`profilePhoto__viewPicture${
        referred ? " viewPicture__referred" : ""
      }`}
    >
      <div className="viewPicture__left">
        {referred && (
          <CloseIcon
            onClick={handleClose}
            className="viewPicture__clone-icon"
          />
        )}
        <div className="viewPicture__leftBody">
          <img
            src={
              REACT_APP_PHOTOS_FOLDER +
              (currentPhoto.cropped
                ? currentPhoto.thumbnail
                : currentPhoto.image)
            }
            alt=""
          />
        </div>
      </div>
      <div className="viewPicture__right">
        {referred && (
          <div className="viewPicture__rightHeader">
            <HeaderRight
              currentUser={currentUser}
              profilePicData={currentUserPic}
            />
          </div>
        )}
        <div ref={containerRef} style={{ overflowY: "overlay" }}>
          <PostHeader
            profilePicData={userOfPhotoPic}
            originalPoster={userOfPhoto}
            currentWall={userOfPhoto}
            timestamp={currentPhoto.timestamp}
          />
          <div className={`post__body small-font`}>
            <p>{currentPhoto.message}</p>
          </div>
          <PostFooter
            post={currentPhoto}
            commentsInPost={commentsInPost}
            commentUsers={commentUsers}
            commentUserPics={commentUserPics}
            currentUser={currentUser}
            currentUserPic={currentUserPic}
            expandComments={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Photo;
