import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { storage } from "firebase.js";
import "./styles/gallery_thumbnail.css";

const storageRef = storage.ref("images");

function GalleryThumbnail({ photo, text, id, link }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    photo &&
      storageRef
        .child(photo.thumbnail)
        .getDownloadURL()
        .then((url) => setImage(url))
        .catch((e) => console.log(e));
  }, [photo]);

  return (
    <div className="gallery_item" key={id}>
      <div className="gallery_img">
        <div className="gallery_dropdown">
          <div className="profile_card_dropdown_button_text gallery_dropdown_icon"></div>
        </div>
        {photo && (
          <Link to={link}>
            <img src={image} alt="" key={id} />
          </Link>
        )}
      </div>
      {text && <span className="gallery_text">{text}</span>}
    </div>
  );
}

export default GalleryThumbnail;
