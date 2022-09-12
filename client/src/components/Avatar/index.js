import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
// Firebase
import db from "firebase.js";

const { REACT_APP_PHOTOS_FOLDER } = process.env;

function NewAvatar({ profilePicData, className }) {
  const props = {
    ...(profilePicData
      ? { src: REACT_APP_PHOTOS_FOLDER + profilePicData.thumbnail }
      : {}),
    className,
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
