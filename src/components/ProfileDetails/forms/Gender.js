import { useState } from "react";
import { Link } from "react-router-dom";
import CheckBox from "components/CheckBox";
import SelectDropdown from "components/SelectDropdown";
import FormFooter from "components/ProfileDetails/FormFooter";
import TextInput from "components/TextInput";

function GenderForm({ handleReset }) {
  const [gender, setGender] = useState("Female");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit} className="container_gender">
      <SelectDropdown
        label="gender"
        listOrder={["Female", "Male", "Custom"]}
        onSelect={setGender}
      />
      {gender === "Custom" ? (
        <div className="container_custom_gender">
          <TextInput label="customGender" name="Gender" />
          <h4>What prononoun do you use?</h4>
          <SelectDropdown
            label="pronoun"
            listOrder={['Female: "Wish her a happy birthday"', 'Male: "Wish him a happy birthday"', 'Neutral: "Wish them a happy birthday"']}
          />
          <div className="footer_message">Your pronoun is Public. <Link to="photos">Learn More</Link></div>
        </div>
      ) : (
        <div className="checkbox_show_on_timeline">
          <CheckBox label="showOnTimeline" text="Show on my timeline" />
        </div>
      )}

      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default GenderForm;
