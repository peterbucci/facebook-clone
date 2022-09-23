import React, { useRef, useEffect } from "react";
import Badge from "@material-ui/core/Badge";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import "./styles/profile_photo.css";
// COMPONENTS
import NewAvatar from "components/Avatar";


function ProfilePhoto({
  user,
  currentProfile,
  profilePic,
  toggleProfilePhotoMenu,
  setToggleProfilePhotoMenu,
  setToggleUploadPhotoForm,
  setProfilePhotoPos
}) {
  const profilePhotoRef = useRef(null);

  useEffect(() => {
    const photoContainer = profilePhotoRef.current;
    if (photoContainer) {
      const handleResize = (photoContainer) => {
        const top =
          window.innerHeight - photoContainer.getBoundingClientRect().top <= 350
            ? photoContainer.getBoundingClientRect().top + window.scrollY - 140 + "px"
            : photoContainer.getBoundingClientRect().top + window.scrollY + 185 + "px";
        const leftNum = photoContainer.getBoundingClientRect().left + window.scrollX - 84
        const left = leftNum < 10 ?  "10px" : leftNum + "px";
        setProfilePhotoPos([top, left]);
      };

      handleResize(photoContainer);
      window.addEventListener("resize", () => handleResize(photoContainer));
      window.addEventListener("scroll", () => handleResize(photoContainer));
      return () => {
        window.removeEventListener("resize", () => handleResize(photoContainer));
        window.removeEventListener("scroll", () => handleResize(photoContainer));
      }
    }
  }, [setProfilePhotoPos]);

  return (
    <div className="header__profilePhoto" ref={profilePhotoRef}>
      {user === currentProfile.id ? (
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <CameraAltIcon
              className="profilePhoto__updateBadge"
              onClick={() => setToggleUploadPhotoForm(true)}
            />
          }
        >
          <NewAvatar 
            profilePicData={profilePic}
            className="profilePhoto__image"
            onClick={() => setToggleProfilePhotoMenu(!toggleProfilePhotoMenu)}
          />
        </Badge>
      ) : (
        <NewAvatar />
      )}
    </div>
  );
}

export default ProfilePhoto;
