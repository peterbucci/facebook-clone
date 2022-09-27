import React from "react"
import AddIcon from "@mui/icons-material/Add";

const { REACT_APP_ICONS_FOLDER } = process.env;

function LifeEventsDetails({lifeEvents}) {
  return (<>
    <li>
      <AddIcon /> <span>Add a life event</span>
    </li>
    {lifeEvents
      ? <></>
      : (
        <li className="no_life_events"><img src={REACT_APP_ICONS_FOLDER + "lifeEventsStar.png"} alt="" /> <span className="no_life_events_text">No life events to show</span></li>
      )}
  </>);
}

export default LifeEventsDetails;
