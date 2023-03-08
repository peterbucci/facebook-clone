import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import * as forms from "./forms";
import * as strings from "resources/strings/profile_detail";

function AddADetail({ detail, linkTo, handleOnClick, user }) {
  const [formExpanded, setFormExpanded] = useState(false);
  const CurrentForm = forms[detail];

  return formExpanded ? (
    <CurrentForm handleReset={() => setFormExpanded(false)} user={user} />
  ) : linkTo ? (
    <Link className="profile_detail_add" to={linkTo}>
      <AddIcon />
      <span>{strings[detail + "Add"]}</span>
    </Link>
  ) : (
    <div
      className="profile_detail_add"
      onClick={() => (handleOnClick ? handleOnClick() : setFormExpanded(true))}
    >
      <AddIcon />
      <span>{strings[detail + "Add"]}</span>
    </div>
  );
}

export default AddADetail;
