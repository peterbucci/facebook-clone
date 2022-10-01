import React from "react";
import { Link } from "react-router-dom";
import "./styles/header_right.css";
// COMPONENTS
import NewAvatar from "components/Avatar";
import SvgIcon from "common/icons/SvgIcon";

function HeaderRight({ currentUser, profilePicData }) {
  return (
    <div className="header__right">
      <button>
        <SvgIcon
          circles={[
            ["7", "7", "6"],
            ["22", "7", "6"],
            ["37", "7", "6"],
            ["7", "22", "6"],
            ["22", "22", "6"],
            ["37", "22", "6"],
            ["7", "37", "6"],
            ["22", "37", "6"],
            ["37", "37", "6"],
          ]}
          viewBox="0 0 44 44"
          height={20}
          width={20}
        />
      </button>
      <button>
        <SvgIcon name="messenger" height={20} width={20} filled={true} />
      </button>
      <button>
        <SvgIcon name="bell" height={20} width={20} filled={true} />
      </button>
      <Link
        to={{
          pathname: "/me",
          state: { uid: currentUser.id },
        }}
        className="header_right_avatar"
      >
        <NewAvatar profilePicData={profilePicData} />
      </Link>
    </div>
  );
}

export default HeaderRight;
