import { useState } from "react";
import TextInput from "components/TextInput";
import FormFooter from "components/ProfileDetails/FormFooter";
import BackgroundIcon from "common/icons/BackgroundIcon";

function WebsiteForm({ handleReset }) {
  const [numberOfTextBoxes, setNumberOfTextBoxes] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      {[...Array(numberOfTextBoxes).keys()].map((idx) => {
        return <TextInput label={`website${idx}`} name="Website address" />;
      })}
      <div className="button_add_form_field" onClick={() => setNumberOfTextBoxes(numberOfTextBoxes + 1)}>
        <BackgroundIcon icon="plus" />
        <span>Add a website</span>
      </div>
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default WebsiteForm;
