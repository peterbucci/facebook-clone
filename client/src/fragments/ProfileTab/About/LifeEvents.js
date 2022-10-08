import ProfileDetails from "fragments/ProfileDetails/";
import NoDetailToShow from "fragments/ProfileDetails/NoDetailToShow";

function LifeEvents({ currentProfile, user }) {
  const isProfileUser = currentProfile.id === user
  return (
    <ul>
      <h3>Life events</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="lifeEvents" disableDefault={true} />
      <NoDetailToShow detail="lifeEvents" />
    </ul>
  );
}

export default LifeEvents;
