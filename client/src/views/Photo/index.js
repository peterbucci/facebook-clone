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

const { REACT_APP_PHOTOS_FOLDER } = process.env;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Photo({ history }) {
  const initalRender = useRef(true)
  const [referred] = useState(history.location.state?.referred);
  const [scrollToY] = useState(history.location.state?.scrollToY)
  const [height] = useState(history.location.state?.height)
  const { getProfile, getSingleCommentFeed } = useApiUtil();
  const { state: { user, users, posts, commentOrder, comments } } = useStateValue()
  const query = useQuery();
  const pid = query.get("pid");
  const uid = query.get("uid");

  const currentPhoto = posts[pid]
  const currentUser = users[uid]
  const handleClose = () => history.push(referred, { scrollToY, height });

  useEffect(() => {
    window.history.replaceState(null, "");
  }, []);

  useEffect(() => {
    if (!currentPhoto || (currentPhoto && pid !== currentPhoto.id)) getProfile(null, uid, pid)
    if (initalRender.current) {
      const order = commentOrder[pid]
      const latestPost = order ? comments[order[0]] : null
      initalRender.current = false
      if (!order || (latestPost?.aggregateCount !== order.length)) getSingleCommentFeed(pid, latestPost?.timestamp, "UPDATE_COMMENTS")
    }
  }, [getProfile, pid, uid, currentPhoto, getSingleCommentFeed, commentOrder, comments]);

  return !currentPhoto ? (
    <></>
  ) : (
    <div
      className={`profilePhoto__viewPicture${
        referred ? " viewPicture__referred" : ""
      }`}
    >
      <div className="viewPicture__left">
        {referred && <CloseIcon onClick={handleClose} className="viewPicture__clone-icon" />}
        <div className="viewPicture__leftBody">
          <img src={REACT_APP_PHOTOS_FOLDER + (currentPhoto.cropped ? currentPhoto.thumbnail : currentPhoto.image
)} alt="" />
        </div>
      </div>
      <div className="viewPicture__right">
        <div className="viewPicture__rightHeader"></div>
        <PostHeader
          profilePicData={posts[users[user].profilePic]}
          originalPoster={currentUser}
          currentWall={currentUser}
          timestamp={currentPhoto.timestamp}
        />
        <div className={`post__body small-font`}>
          <p>{currentPhoto.message}</p>
        </div>
        <PostFooter
          post={currentPhoto}
          expandComments={true}
        />
      </div>
    </div>
  );
}

export default Photo;
