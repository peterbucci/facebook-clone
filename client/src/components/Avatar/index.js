import React from "react";
import { Avatar } from "@material-ui/core";

const { REACT_APP_PHOTOS_FOLDER } = process.env;

function NewAvatar({ profilePicData, className, onClick }) {
  const props = {
    ...(profilePicData
      ? { src: REACT_APP_PHOTOS_FOLDER + profilePicData.thumbnail }
      : {}),
    className,
    onClick
  };

  return (
    <Avatar {...props}>
      <img
        style={{ width: "100%" }}
        src={REACT_APP_PHOTOS_FOLDER + "default_avatar.png"}
        alt="Profile Default"
      />
    </Avatar>
  );
}

export default NewAvatar;
