import { useEffect, useState } from "react"
import ProfileDetails from "components/ProfileDetails";
import NoDetailToShow from "components/ProfileDetails/NoDetailToShow";

function ContactAndBasicInfo({ currentProfile, user }) {
  const isProfileUser = currentProfile.id === user
  const [noContactInfo, setNoContactInfo] = useState(true)
  const [noLinks, setNoLinks] = useState(true)
  const [noBasicInfo, setNoBasicInfo] = useState(true)

  useEffect(() => {
    setNoContactInfo(!isProfileUser)
    setNoLinks(!isProfileUser)
    setNoBasicInfo(!isProfileUser)
  }, [isProfileUser])

  return (
    <ul>
      <h3>Contact info</h3>
      {noContactInfo && <NoDetailToShow detail="contactInfo" />}
      <ProfileDetails isProfileUser={isProfileUser} detail="address" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="phone" disableDefault={true} />
      <h3>Websites and social links</h3>
      {noLinks && <NoDetailToShow detail="link" />}
      <ProfileDetails isProfileUser={isProfileUser} detail="website" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="social" disableDefault={true} />
      <h3>Basic Info</h3>
      {noBasicInfo && <NoDetailToShow detail="basicInfo" />}
      <ProfileDetails isProfileUser={isProfileUser} detail="language" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="religion" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="politics" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="sexuality" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="gender" disableDefault={true} />
      <ProfileDetails isProfileUser={isProfileUser} detail="birthday" disableDefault={true} />
    </ul>
  );
}

export default ContactAndBasicInfo