import {
  WorkplaceDetails,
  HighSchoolDetails,
  CollegeDetails,
} from "fragments/ProfileDetails/";

function WorkAndEducation({ currentProfile, user }) {
  const isProfileUser = currentProfile.id === user
  return (
    <ul>
      <h3>Work</h3>
      <WorkplaceDetails isProfileUser={isProfileUser} />
      <h3>College</h3>
      <CollegeDetails />
      <h3>High School</h3>
      <HighSchoolDetails />
    </ul>
  );
}

export default WorkAndEducation;
