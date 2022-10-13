import { useEffect, useState } from "react"
import ProfileDetails from "fragments/ProfileDetails/";
import NoDetailToShow from "fragments/ProfileDetails/NoDetailToShow";

function Overview({ currentProfile, user }) {
  const isProfileUser = currentProfile.id === user
  const [noSchools, setNoSchools] = useState(true)
  const [noPlaces, setNoPlaces] = useState(true)

  useEffect(() => {
    setNoPlaces(!isProfileUser)
  }, [isProfileUser])

  useEffect(() => {
    setNoSchools(!isProfileUser)
  }, [isProfileUser])

  return (
    <ul>
      <ProfileDetails isProfileUser={isProfileUser} detail="workplace" />
      {noSchools && <NoDetailToShow detail="school" />}
      <ProfileDetails isProfileUser={isProfileUser} detail="college" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="highSchool" disableDefault={true} />
      {noPlaces && <NoDetailToShow detail="places" />}
      <ProfileDetails isProfileUser={isProfileUser} detail="currentCity" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="hometown" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="relationship" />
      <ProfileDetails isProfileUser={isProfileUser} detail="phone" disableDefault={!isProfileUser} />
    </ul>
  )
}

export default Overview