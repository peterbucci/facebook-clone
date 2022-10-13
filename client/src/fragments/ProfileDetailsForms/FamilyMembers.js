import SelectDropdown from "components/SelectDropdown";
import TextInput from "components/TextInput";
import FormFooter from "fragments/ProfileDetails/FormFooter";

function RelationshipForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container__form_element">
        <TextInput label="familyMember" name="Family Member" />
        <SelectDropdown
          label={"familyRelationship"}
          listOrder={[
            "Relationship",
            "Father",
            "Daughter",
            "Son",
            "Sister",
            "Brother",
            "Aunt",
            "Uncle",
            "Niece",
            "Nephew",
            "Cousin {female}",
            "Cousin (male)",
            "Grandmother",
            "Grandfather",
            "Granddaughter",
            "Grandson",
            "Stepsister",
            "Stepbrother",
            "Stepmother",
            "Stepfather",
            "Stepdaughter",
            "Stepson",
            "sister-in-law",
            "brother-in-law",
            "mother-in-law",
            "father-in-law",
            "daughter-in-law",
            "son-in-law",
            "Sibling (gender neutral)",
            "Parent (gender neutral)",
            "Child (gender neutral)",
            "Sibling of Parent (gender neutral)",
            "Child of Sibling (gender neutral)",
            "Cousin (gender neutral)",
            "Grandparent (gender neutral)",
            "Grandchild (gender neutral)",
            "Step Sibing (gender neutral)",
            "Step Parent (gender neutral)",
            "Step Child (gender neutral)",
            "Sibling-in-law (gender neutral)",
            "Parent-in-law (gender neutral)",
            "Child-in-law (gender neutral)",
            "Family Member (gender neutral)",
            "Pet (gender neutral)",
          ]}
        />
      </div>
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default RelationshipForm;
