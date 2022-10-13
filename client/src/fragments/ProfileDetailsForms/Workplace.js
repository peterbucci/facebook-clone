import { useState } from "react";
import CheckBox from "components/CheckBox";
import TextInput from "components/TextInput";
import DatePicker from "components/DatePicker";
import FormFooter from "fragments/ProfileDetails/FormFooter";

function WorkplaceForm({ handleReset }) {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [workHere, setWorkHere] = useState(true);

  const requiredFields = ["company"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requiredFields.every((field) => e.target.elements[field]?.value.length))
      console.log(e.target.elements);
    else console.log(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={(e) => {
        switch (e.target.id) {
          case "currentEmployment":
            setWorkHere(e.target.checked);
            break;
          default:
            break;
        }
        if (disableSubmit) setDisableSubmit(false);
      }}
    >
      <TextInput label="company" name="Company" />
      <TextInput label="position" name="Position" />
      <TextInput label="cityTown" name="City/Town" />
      <TextInput label="description" name="Description" rows={3} />
      <div className="employment_length">
        <h4>Time Period</h4>
        <CheckBox
          label="currentEmployment"
          text="I currently work here"
          isChecked={true}
        />
        <DatePicker
          fromTextVisibility={workHere}
          toDateVisibility={!workHere}
          toTextVisibility={!workHere}
        />
      </div>
      <FormFooter handleReset={handleReset} disableSubmit={disableSubmit} />
    </form>
  );
}

export default WorkplaceForm;
