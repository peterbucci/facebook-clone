import { useEffect, useState } from "react"
import ProfileDetails from "fragments/ProfileDetails/";
import NoDetailToShow from "fragments/ProfileDetails/NoDetailToShow";

function PlacesLived({ currentProfile, user }) {
  const isProfileUser = currentProfile.id === user
  const [noPlaces, setNoPlaces] = useState(true)

  useEffect(() => {
    setNoPlaces(!isProfileUser)
  }, [isProfileUser])

  return (
    <ul>
      <h3>Places lived</h3>
      {noPlaces && <NoDetailToShow detail="places" />}
      <ProfileDetails isProfileUser={isProfileUser} detail="currentCity" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="hometown" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="city" disableDefault={true} />
    </ul>
  );
}

export default PlacesLived;
