import { useEffect, useState } from "react";
import ProfileDetails from "components/ProfileDetails";
import { useApiUtil } from "providers/ApiUtil";
import { useStateValue } from "providers/StateProvider";

function WorkAndEducation({ currentProfile, user }) {
  const { getProfileDetails } = useApiUtil();
  const isProfileUser = currentProfile.id === user;
  const [initialRender, setInitialRender] = useState({});
  const {
    state: { profileDetails },
  } = useStateValue();

  useEffect(() => {
    if (initialRender) {
      getProfileDetails(currentProfile.id, [
        "workplace",
        "college",
        "highSchool",
      ]);
      setInitialRender(false);
    }
  }, [getProfileDetails, currentProfile.id, initialRender]);

  return (
    <ul>
      <h3>Work</h3>
      <ProfileDetails
        isProfileUser={isProfileUser}
        currentProfile={currentProfile}
        user={user}
        detail="workplace"
        data={profileDetails.workplace}
      />
      <h3>College</h3>
      <ProfileDetails
        isProfileUser={isProfileUser}
        currentProfile={currentProfile}
        user={user}
        detail="college"
        data={profileDetails.college}
      />
      <h3>High School</h3>
      <ProfileDetails
        isProfileUser={isProfileUser}
        currentProfile={currentProfile}
        user={user}
        detail="highSchool"
      />
    </ul>
  );
}

export default WorkAndEducation;
