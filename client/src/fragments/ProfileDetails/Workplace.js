import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import BackgroundIcon from "common/icons/BackgroundIcon";

function WorkplaceDetails({ isProfileUser }) {
  const [expanded, setExpanded] = useState(false);

  return isProfileUser ? (
    <li className="detail_add_link" onClick={() => setExpanded(true)}>
      {!expanded ? (
        <>
          <AddIcon /> <span>Add a workplace</span>
        </>
      ) : (
        "form"
      )}
    </li>
  ) : (
    <li><BackgroundIcon image="XF1fUskiRxe" position={[0, 0]}  /> No workplaces to show</li>
  );
}

export default WorkplaceDetails;
