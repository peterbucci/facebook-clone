import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApiUtil } from "providers/ApiUtil";

const { REACT_APP_PHOTOS_FOLDER } = process.env;

function Photos({ path, userId, photos, containerRef }) {
  const { getPosts } = useApiUtil();
  const [tab, setTab] = useState(
    path.startsWith("photos") ? path : "photos_by"
  );
  const [renderedPhotos, setPhotosToRender] = useState(null);
  const fullPath = useLocation();

  useEffect(() => {
    setTab(path.startsWith("photos") ? path : "photos_by");
  }, [path]);

  useEffect(() => {
    if ((!renderedPhotos && tab === "photos") || tab === "photos_by") {
      const limit = path.startsWith("photos") ? null : 8;
      getPosts(userId, null, ["type", "==", "Profile Picture"], limit).then(
        (selectedPhotos) =>
          setPhotosToRender(selectedPhotos.map((p) => p.data()))
      );
    }
  }, [renderedPhotos, getPosts, path, userId, tab]);

  return (
    <div
      className="profile_card profile_photos"
    >
      <div className="profile_card_header">
        <h2>
          <Link to="photos">Photos</Link>
        </h2>
        <div className="profile_card_header_left">
          <span className="profile_card_text">Add photos/video</span>
          <span className="profile_card_dropdown_button">
            <div className="profile_card_dropdown_button_text"></div>
          </span>
        </div>
      </div>
      <div className="profile_card_nav">
        <ul className="header__nav">
          <li
            className={tab === "photos_by" || tab === "photos" ? "active" : ""}
          >
            {path.startsWith("photos") ? (
              <Link to="photos_by">Your Photos</Link>
            ) : (
              <span onClick={() => setTab("photos_by")}>Your Photos</span>
            )}
          </li>
          <li className={tab === "photos_albums" ? "active" : ""}>
            {path.startsWith("photos") ? (
              <Link to="photos_albums">Albums</Link>
            ) : (
              <span onClick={() => setTab("photos_albums")}>Albums</span>
            )}
          </li>
        </ul>
      </div>
      <div className="profile_card_body">
        {tab === "photos" || tab === "photos_by" ? (
          renderedPhotos?.map((photo) => (
            <div className="photo_grid_item">
              <Link
                to={{
                  pathname: "/photo",
                  search: `?uid=${photo.userId}&pid=${photo.id}`,
                  state: {
                    referred: fullPath.pathname,
                    scrollToY: window.scrollY,
                    height: containerRef.current.offsetHeight,
                  },
                }}
              >
                <img
                  src={REACT_APP_PHOTOS_FOLDER + photo.thumbnail}
                  alt=""
                  key={photo.id}
                />
              </Link>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Photos;
