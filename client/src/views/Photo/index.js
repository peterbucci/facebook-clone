import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// ICONS
import CloseIcon from "@material-ui/icons/Close";
import "./styles/photo.css";
// COMPONENTS
import PostHeader from "components/Post/PostHeader";
import PostFooter from "components/Post/PostFooter";

import { useApiUtil } from "providers/ApiUtil";

const { REACT_APP_PHOTOS_FOLDER } = process.env;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Photo({ history }) {
  const state = history.location.state;
  const [referred] = useState(state?.user);
  const [currentPhoto, setCurrentPhoto] = useState(state?.pic);
  const [currentUser, setCurrentUser] = useState(state?.user);
  const [usersInPost, setUsersInPost] = useState(null);
  const [commentsInPost, setCommentsInPost] = useState(null);
  const { getProfile } = useApiUtil();

  const query = useQuery();
  const pid = query.get("pid");
  const uid = query.get("uid");

  const handleClose = () => {
    referred &&
      history.push(currentUser.url, { user: currentUser, pic: currentPhoto });
  };

  useEffect(() => {
    window.history.replaceState(null, "");
  }, []);

  useEffect(() => {
    if (!currentUser || (currentPhoto && pid !== currentPhoto.id)) {
      getProfile(null, uid, pid).then((profile) => {
        setCurrentPhoto(profile.pic);
        setCurrentUser(profile.user);
      });
    }
  }, [getProfile, currentUser, pid, uid, currentPhoto]);

  return !currentPhoto ? (
    <></>
  ) : (
    <div
      className={`profilePhoto__viewPicture${
        referred ? " viewPicture__referred" : ""
      }`}
    >
      <div className="viewPicture__left">
        <div className="viewPicture__leftHeader">
          {referred && <CloseIcon onClick={handleClose} />}
        </div>
        <div className="viewPicture__leftBody">
          <img src={REACT_APP_PHOTOS_FOLDER + currentPhoto.image} alt="" />
        </div>
      </div>
      <div className="viewPicture__right">
        <div className="viewPicture__rightHeader"></div>
        <PostHeader
          originalPoster={currentUser}
          currentWall={currentUser}
          timestamp={currentPhoto.timestamp}
        />
        <div className={`post__body small-font`}>
          <p>{currentPhoto.message}</p>
        </div>
        <PostFooter
          post={currentPhoto}
          usersInPost={usersInPost}
          commentsInPost={commentsInPost}
        />
      </div>
    </div>
  );
}

export default Photo;
