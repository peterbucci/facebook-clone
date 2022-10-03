import Badge from "@material-ui/core/Badge";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
// COMPONENTS
import NewAvatar from "components/Avatar";

function ProfileAvatar({
  user,
  currentProfile,
  setToggleUploadPhotoForm,
  profilePic,
  handleClick,
  buttonRef,
}) {
  
  return (
    <div ref={buttonRef} className={`profilePhoto__wrapper${profilePic || user === currentProfile.id ? " dropdown_active" : ""}`}>
      {user === currentProfile.id ? (
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <CameraAltIcon
              className="profilePhoto__updateBadge"
              onClick={() => setToggleUploadPhotoForm(true)}
            />
          }
        >
          <NewAvatar
            profilePicData={profilePic}
            className="profilePhoto__image"
            onClick={handleClick}
          />
        </Badge>
      ) : (
        <NewAvatar
          profilePicData={profilePic}
          className="profilePhoto__image"
          onClick={handleClick}
        />
      )}
    </div>
  );
}

export default ProfileAvatar;
