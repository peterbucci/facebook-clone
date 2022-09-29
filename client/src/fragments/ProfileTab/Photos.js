import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApiUtil } from "providers/ApiUtil";
import GalleryThumbnail from "components/GalleryThumbnail";
import DropdownMenu from "components/DropdownMenu";

function Photos({ path, userId, posts, containerRef }) {
  const { getPosts, getAlbums } = useApiUtil();
  const [tab, setTab] = useState(
    path.startsWith("photos") ? path : "photos_by"
  );
  const [renderedPhotos, setPhotosToRender] = useState(null);
  const [albums, setAlbums] = useState(null);
  const fullPath = useLocation();
  const appRef = document.getElementsByClassName("app")[0];
  const createAlbum = {
    key: "create",
    name: "Create album",
    id: "create",
    link: "photos",
  };

  useEffect(() => {
    setTab(path.startsWith("photos") ? path : "photos_by");
  }, [path]);

  useEffect(() => {
    if (tab === "photos" || tab === "photos_by") {
      const limit = path.startsWith("photos") ? null : 8;
      getPosts(userId, null, ["type", "==", "Photo"], limit).then(
        (selectedPhotos) =>
          setPhotosToRender(selectedPhotos.map((p) => p.data()))
      );
    } else if (tab === "photos_albums" && !albums) {
      getAlbums(userId).then((userAlbums) => setAlbums(userAlbums));
    }
  }, [getPosts, path, userId, tab, getAlbums, albums]);

  return (
    <div className="profile_card profile_photos">
      <div className="profile_card_header">
        <h2>
          <Link to="photos">Photos</Link>
        </h2>
        <div className="profile_card_header_left">
          <span className="profile_card_text">Add photos/video</span>
          <DropdownMenu
            listItems={{ "See Photos Hidden From Timeline": "photos" }}
            right={.02}
            width={344}
          />
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
        {tab === "photos" || tab === "photos_by"
          ? renderedPhotos?.map((photo) => (
              <GalleryThumbnail
                key={photo.id}
                photo={photo}
                id={photo.id}
                link={{
                  pathname: "/photo",
                  search: `?uid=${photo.userId}&pid=${photo.id}`,
                  state: {
                    referred: fullPath.pathname,
                    scrollToY: window.scrollY,
                    height: appRef.offsetHeight,
                  },
                }}
              />
            ))
          : [createAlbum, ...(albums ?? [])].map((album, i) => {
              const photo = posts[album.cover];
              return (
                <GalleryThumbnail
                  key={album.id}
                  photo={photo}
                  text={album.name}
                  id={album.id}
                  link="photos"
                />
              );
            })}
      </div>
    </div>
  );
}

export default Photos;