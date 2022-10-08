import React from "react";
import "./styles/cover_photo.css";
import BackgroundIcon from "common/icons/BackgroundIcon";
// STATE
import { useStateValue } from "providers/StateProvider";
import DropdownMenu from "components/DropdownMenu";

function CoverPhoto({ currentProfile }) {
  const {
    state: { user },
  } = useStateValue();
  return (
    <div className="header__coverPhoto">
      {currentProfile.id === user && (
        <DropdownMenu
          listItems={{
            "Select Photo": {
              onClick: "photos",
              Icon: () => (
                <BackgroundIcon icon="photos" />
              ),
            },
            "Upload Photo": {
              onClick: "photos",
              Icon: () => (
                <BackgroundIcon icon="upload" />
              ),
            },
          }}
          listOrder={["Select Photo", "Upload Photo"]}
          buttonText="Add cover photo"
          buttonIcon="cameraFilled"
          align="right"
          width={344}
        />
      )}
    </div>
  );
}

export default CoverPhoto;
