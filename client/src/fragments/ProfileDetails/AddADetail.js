import AddIcon from "@mui/icons-material/Add";
import * as strings from "resources/strings/profile_detail";

function AddADetail({ detail, setExpanded, onClick }) {


  return (
    <li className="detail_add" onClick={() => onClick ? onClick() : setExpanded(true)}>
      <AddIcon />
      <span>{strings[detail + "Add"]}</span>
    </li>
  );
}

export default AddADetail;
