import { Link } from "react-router-dom";
import "./styles/gallery_thumbnail.css"

const { REACT_APP_PHOTOS_FOLDER } = process.env;

function GalleryThumbnail({ photo, text, id, link }) {
  return (
    <div className="gallery_item" key={id}>
      <div className="gallery_img">
        <div className="gallery_dropdown">
          <div className="profile_card_dropdown_button_text gallery_dropdown_icon"></div>
        </div>
        {photo && (
          <Link to={link}>
            <img
              src={REACT_APP_PHOTOS_FOLDER + photo.thumbnail}
              alt=""
              key={id}
            />
          </Link>
        )}
      </div>
      {text && <span className="gallery_text">{text}</span>}
    </div>
  );
}

export default GalleryThumbnail;