import "./styles/profile_details.css";
import AddADetail from "./AddADetail";
import NoDetailToShow from "./NoDetailToShow";
import * as layouts from "./layouts";

function ProfileDetails({
  isProfileUser,
  detail,
  data,
  disableDefault,
  user,
  linkTo,
  handleOnClick,
}) {
  const CurrentLayout = layouts[detail];
  return (
    <li className="profile_detail">
      {isProfileUser && (
        <AddADetail
          detail={detail}
          linkTo={linkTo}
          handleOnClick={handleOnClick}
          user={user}
        />
      )}
      {data
        ? data.map((detail, idx) => <CurrentLayout key={idx} detail={detail} user={user} idx={idx} isProfileUser={isProfileUser} />)
        : !disableDefault &&
          !isProfileUser && <NoDetailToShow detail={detail} />}
    </li>
  );
}

export default ProfileDetails;
