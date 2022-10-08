import ProfileDetails from "fragments/ProfileDetails/";

function Relationships({ currentProfile, user }) {
  const isProfileUser = currentProfile.id === user
  return (
    <ul>
      <h3>Relationship</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="relationship" />
      <h3>Family Members</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="family" />
    </ul>
  );
}

export default Relationships;
