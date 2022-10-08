import ProfileDetails from "fragments/ProfileDetails/";

function WorkAndEducation({ currentProfile, user }) {
  const isProfileUser = currentProfile.id === user
  return (
    <ul>
      <h3>Work</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="workplace" />
      <h3>College</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="college" />
      <h3>High School</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="highSchool" />
    </ul>
  );
}

export default WorkAndEducation;
