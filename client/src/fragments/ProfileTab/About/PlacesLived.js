import {
  CurrentCityDetails,
  HometownDetails,
  CityDetails,
} from "fragments/ProfileDetails/";

function PlacesLived() {
  return (
    <ul>
      <h3>Places lived</h3>
      <CurrentCityDetails />
      <HometownDetails />
      <CityDetails />
    </ul>
  );
}

export default PlacesLived;
