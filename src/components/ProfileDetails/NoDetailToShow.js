import BackgroundIcon from "common/icons/BackgroundIcon";
import * as strings from "resources/strings/profile_detail";

function NoDetailToShow({ detail }) {
  return (
    <div className="detail_none">
      <BackgroundIcon icon={detail} width={24} height={24} margin={6} />
      <span>{strings[detail + "None"]}</span>
    </div>
  );
}

export default NoDetailToShow;
