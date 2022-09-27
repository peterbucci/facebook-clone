import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import "./styles/about.css";
import {
  WorkplaceDetails,
  HighSchoolDetails,
  CollegeDetails,
  CurrentCityDetails,
  HometownDetails,
  CityDetails,
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
  RelationshipDetails,
  FamilyMembersDetails,
  AboutYouDetails,
  NamePronunciationDetails,
  OtherNamesDetails,
  FavoriteQuotesDetails,
  BloodDonationsDetails,
  LifeEventsDetails,
} from "fragments/ProfileDetails/";

function About({ path }) {
  return (
    <div className="profile_card profile_about">
      <div className="profile_about_sidebar">
        <div className="profile_card_header">
          <h2>About</h2>
        </div>
        <ul>
          <li
            className={
              path === "about_overview" || path === "about" ? "active" : ""
            }
          >
            <Link to="about_overview">Overview</Link>
          </li>
          <li className={path === "about_work_and_education" ? "active" : ""}>
            <Link to="about_work_and_education">Work and education</Link>
          </li>
          <li className={path === "about_places" ? "active" : ""}>
            <Link to="about_places">Places lived</Link>
          </li>
          <li
            className={path === "about_contact_and_basic_info" ? "active" : ""}
          >
            <Link to="about_contact_and_basic_info">
              Contact and basic info
            </Link>
          </li>
          <li
            className={
              path === "about_family_and_relationships" ? "active" : ""
            }
          >
            <Link to="about_family_and_relationships">
              Family and relationships
            </Link>
          </li>
          <li className={path === "about_details" ? "active" : ""}>
            <Link to="about_details">Details about you</Link>
          </li>
          <li className={path === "about_life_events" ? "active" : ""}>
            <Link to="about_life_events">Life events</Link>
          </li>
        </ul>
      </div>
      <div className="profile_about_body">
        {path === "about_overview" || path === "about" ? (
          <ul>
            <WorkplaceDetails />
            <HighSchoolDetails />
            <CollegeDetails />
            <CurrentCityDetails />
            <HometownDetails />
            <li>
              <AddIcon /> <span>Add a relationship status</span>
            </li>
            <PhoneNumberDetails />
          </ul>
        ) : path === "about_work_and_education" ? (
          <ul>
            <h3>Work</h3>
            <WorkplaceDetails />
            <h3>College</h3>
            <CollegeDetails />
            <h3>High School</h3>
            <HighSchoolDetails />
          </ul>
        ) : path === "about_places" ? (
          <ul>
            <h3>Places lived</h3>
            <CurrentCityDetails />
            <HometownDetails />
            <CityDetails />
          </ul>
        ) : path === "about_contact_and_basic_info" ? (
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
        ) : path === "about_family_and_relationships" ? (
          <ul>
            <h3>Relationship</h3>
            <RelationshipDetails />
            <h3>Family Members</h3>
            <FamilyMembersDetails />
          </ul>
        ) : path === "about_details" ? (
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
        ) : path === "about_life_events" ? (
          <ul>
            <h3>Life events</h3>
            <LifeEventsDetails />
          </ul>
        ) : (
          <span>Not found</span>
        )}
      </div>
    </div>
  );
}

export default About;
