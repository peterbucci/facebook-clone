import React from "react";
import DropdownMenu from "components/DropdownMenu";

function Friends({ path }) {
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        <h2>Friends</h2>
        <div className="profile_card_header_left">
          <span className="profile_card_text">Friend requests</span>
          <span className="profile_card_text">Find Friends</span>
          <DropdownMenu
            listItems={{ "Edit Privacy": { onClick: "photos" } }}
            right={.02}
            width={344}
          />
        </div>
      </div>
    </div>
  );
}

export default Friends;