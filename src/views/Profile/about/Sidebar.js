import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

function Sidebar({ path }) {
  return (
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
        <li className={path === "about_contact_and_basic_info" ? "active" : ""}>
          <Link to="about_contact_and_basic_info">Contact and basic info</Link>
        </li>
        <li
          className={path === "about_family_and_relationships" ? "active" : ""}
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
  );
}

export default Sidebar;
