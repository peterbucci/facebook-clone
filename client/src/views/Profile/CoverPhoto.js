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
                <BackgroundIcon image="fgWwJT0JD-x" position={[0, -406]} />
              ),
            },
            "Upload Photo": {
              onClick: "photos",
              Icon: () => (
                <BackgroundIcon image="SyKgNW4aY0X" position={[0, -21]} />
              ),
            },
          }}
          buttonText="Add cover photo"
          buttonIcon={{
            file: "24cg4eigpiL",
            pos: [0, -328],
          }}
          align="right"
          width={344}
        />
      )}
    </div>
  );
}

export default CoverPhoto;
