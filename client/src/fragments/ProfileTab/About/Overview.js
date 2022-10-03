import AddIcon from "@mui/icons-material/Add";
import {
  WorkplaceDetails,
  HighSchoolDetails,
  CollegeDetails,
  CurrentCityDetails,
  HometownDetails,
  PhoneNumberDetails,
} from "fragments/ProfileDetails/";

function Overview({ currentProfile, user }) {
  const isProfileUser = currentProfile.id === user

  return (
    <ul>
      <WorkplaceDetails isProfileUser={isProfileUser} />
      <HighSchoolDetails />
      <CollegeDetails />
      <CurrentCityDetails />
      <HometownDetails />
      <li>
        <AddIcon /> <span>Add a relationship status</span>
      </li>
      <PhoneNumberDetails />
    </ul>
  )
}

export default Overview