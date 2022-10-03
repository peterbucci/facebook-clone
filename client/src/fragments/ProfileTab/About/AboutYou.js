import {
  AboutYouDetails,
  NamePronunciationDetails,
  OtherNamesDetails,
  FavoriteQuotesDetails,
  BloodDonationsDetails,
} from "fragments/ProfileDetails/";

function AboutYou() {
  return (
    <ul>
      <h3>About you</h3>
      <AboutYouDetails />
      <h3>Name pronunciation</h3>
      <NamePronunciationDetails />
      <h3>Other names</h3>
      <OtherNamesDetails />
      <h3>Favorite quotes</h3>
      <FavoriteQuotesDetails />
      <h3>Blood donations</h3>
      <BloodDonationsDetails />
    </ul>
  );
}

export default AboutYou;
