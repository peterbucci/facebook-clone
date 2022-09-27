import React from "react";

function Friends({ path }) {
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        <h2>Friends</h2>
        <div className="profile_card_header_left">
          <span className="profile_card_dropdown_button"><div className="profile_card_dropdown_button_text"></div></span>
        </div>
      </div>
    </div>
  );
}

export default Friends;