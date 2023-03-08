import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { storage } from "firebase.js";
import { useEffect } from "react";

const storageRef = storage.ref("images");

function NewAvatar({ profilePicData, className, onClick }) {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    profilePicData &&
      storageRef
        .child(profilePicData.thumbnail)
        .getDownloadURL()
        .then((url) => setImageURL(url))
        .catch((e) => console.log(e));
  }, [profilePicData]);

  const props = {
    ...(imageURL ? { src: imageURL } : {}),
    className,
    onClick,
  };

  return (
    <Avatar {...props}>
      <img
        style={{ width: "100%" }}
        src="/default_avatar.png"
        alt="Profile Default"
      />
    </Avatar>
  );
}

export default NewAvatar;
