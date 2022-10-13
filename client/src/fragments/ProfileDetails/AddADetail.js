import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import * as strings from "resources/strings/profile_detail";

function AddADetail({ detail, setExpanded, linkTo }) {

  return (
    <li className="detail_add" onClick={() => linkTo ? null : setExpanded(true)}>
      <AddIcon />
      <span>{linkTo ? <Link to={linkTo}>{strings[detail + "Add"]}</Link> : strings[detail + "Add"]}</span>
    </li>
  );
}

export default AddADetail;
