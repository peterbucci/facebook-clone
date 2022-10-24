import SelectDropdown from "components/SelectDropdown";
import FormFooter from "components/ProfileDetails/FormFooter";

function RelationshipForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container__form_element">
        <SelectDropdown
          label="relationshipStatus"
          listOrder={[
            "Status",
            "Single",
            "In a relationship",
            "Engaged",
            "Married",
            "In a civil union",
            "In a domestic partnership",
            "In an open relationship",
            "It's complicated",
            "Separated",
            "Divorced",
            "Widowed",
          ]}
        />
        <div className="relationship_message">Changes will not appear in News Feed.</div>
      </div>
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default RelationshipForm;
