import {
  RelationshipDetails,
  FamilyMembersDetails,
} from "fragments/ProfileDetails/";

function Relationships() {
  return (
    <ul>
      <h3>Relationship</h3>
      <RelationshipDetails />
      <h3>Family Members</h3>
      <FamilyMembersDetails />
    </ul>
  );
}

export default Relationships;
