import {
  AddressDetails,
  PhoneNumberDetails,
  WebsiteDetails,
  SocialLinkDetails,
  LanguageDetails,
  ReligiousViewsDetails,
  PoliticalViewsDetails,
  SexualPreferenceDetails,
  GenderDetails,
  BirthDateDetails,
  BirthYearDetails,
} from "fragments/ProfileDetails/";

function ContactAndBasicInfo() {
  return (
    <ul>
      <h3>Contact info</h3>
      <AddressDetails />
      <PhoneNumberDetails />
      <h3>Websites and social links</h3>
      <WebsiteDetails />
      <SocialLinkDetails />
      <h3>Basic Info</h3>
      <LanguageDetails />
      <ReligiousViewsDetails />
      <PoliticalViewsDetails />
      <SexualPreferenceDetails />
      <GenderDetails />
      <BirthDateDetails />
      <BirthYearDetails />
    </ul>
  );
}

export default ContactAndBasicInfo