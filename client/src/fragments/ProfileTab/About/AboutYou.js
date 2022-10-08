import ProfileDetails from "fragments/ProfileDetails/";

function AboutYou({ currentProfile, user }) {
  const isProfileUser = currentProfile.id === user;

  return (
    <ul>
      <h3>About you</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="about" />
      <h3>Name pronunciation</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="pronunciation" />
      <h3>Other names</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="otherNames" />
      <h3>Favorite quotes</h3>
      <ProfileDetails isProfileUser={isProfileUser} detail="quotes" />
      {isProfileUser && (
        <>
          <h3>Blood donations</h3>
          <ProfileDetails
            isProfileUser={isProfileUser}
            detail="bloodDonations"
            onClick={() => console.log("blood donations clicked")}
          />
        </>
      )}
    </ul>
  );
}

export default AboutYou;
