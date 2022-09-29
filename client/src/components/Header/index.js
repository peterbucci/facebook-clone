import { Link, useLocation } from "react-router-dom";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
// STATE
import { useStateValue } from "providers/StateProvider";
import SvgIcon from "common/icons/SvgIcon";

function Header() {
  const location = useLocation();
  const {
    state: { user, users, posts },
  } = useStateValue();
  const currentUser = users[user];
  const profilePicData = posts[currentUser.profilePic];
  const linkClasses = `header__center__option${
    location.pathname === "/" ? " active" : " not-active"
  }`;

  return (
    <>
      <HeaderLeft />
      <div className="header">
        <Link to="/" className={linkClasses}>
          <SvgIcon name="home" filled={location.pathname === "/"} />
        </Link>
        <div className="header__center__option">
          <SvgIcon name="friends" />
        </div>
        <div className="header__center__option">
          <SvgIcon name="videos" />
        </div>
        <div className="header__center__option">
          <SvgIcon name="groups" />
        </div>
        <div className="header__center__option groups">
          <SvgIcon Icon name="games" />
        </div>
        <div className="header__center__option more">
          <SvgIcon name="menu" />
        </div>
      </div>
      <HeaderRight currentUser={currentUser} profilePicData={profilePicData} />
    </>
  );
}

export default Header;
