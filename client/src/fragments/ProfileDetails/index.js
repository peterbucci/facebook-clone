import { useState } from "react";
import "./styles/profile_details.css"
import AddADetail from "./AddADetail";
import NoDetailToShow from "./NoDetailToShow";
import * as components from "fragments/ProfileDetailsForms/";

function ProfileDetails({ isProfileUser, detail, disableDefault, linkTo }) {
  const [expanded, setExpanded] = useState(false);
  const CurrentForm = components[detail];

  return isProfileUser ? (
    expanded ? (
      <li className="profile_detail_form">
        <CurrentForm handleReset={() => setExpanded(false)} />
      </li>
    ) : (
      <AddADetail detail={detail} setExpanded={setExpanded} linkTo={linkTo} />
    )
  ) : disableDefault ? (
    <></>
  ) : (
    <NoDetailToShow detail={detail} />
  );
}

export default ProfileDetails;
