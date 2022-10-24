import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "../styles/about.css";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import WorkAndEducation from "./WorkAndEducation";
import PlacesLived from "./PlacesLived";
import ContactAndBasicInfo from "./ContactAndBasicInfo";
import Relationships from "./Relationships";
import AboutYou from "./AboutYou";
import LifeEvents from "./LifeEvents";

function About({ path, currentProfile, user }) {
  const match = useRouteMatch();
  return (
    <div className="profile_card profile_about">
      <Sidebar path={path} />
      <div className="profile_about_body">
        <Switch>
          <Route path={"/" + match.params.profileURL + "/about_overview"}>
            <Overview currentProfile={currentProfile} user={user} />
          </Route>
          <Route
            path={"/" + match.params.profileURL + "/about_work_and_education"}
          >
            <WorkAndEducation currentProfile={currentProfile} user={user} />
          </Route>
          <Route path={"/" + match.params.profileURL + "/about_places"}>
            <PlacesLived currentProfile={currentProfile} user={user} />
          </Route>
          <Route
            path={
              "/" + match.params.profileURL + "/about_contact_and_basic_info"
            }
          >
            <ContactAndBasicInfo currentProfile={currentProfile} user={user} />
          </Route>
          <Route
            path={
              "/" + match.params.profileURL + "/about_family_and_relationships"
            }
          >
            <Relationships currentProfile={currentProfile} user={user} />
          </Route>
          <Route path={"/" + match.params.profileURL + "/about_details"}>
            <AboutYou currentProfile={currentProfile} user={user} />
          </Route>
          <Route path={"/" + match.params.profileURL + "/about_life_events"}>
            <LifeEvents currentProfile={currentProfile} user={user} />
          </Route>
          <Route path={"/" + match.params.profileURL + "/about"}>
            <Overview currentProfile={currentProfile} user={user} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default About;
