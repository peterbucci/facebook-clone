import { useState } from "react";
import CheckBox from "components/CheckBox";
import TextInput from "components/TextInput";
import DatePicker from "components/DatePicker";
import FormFooter from "components/ProfileDetails/FormFooter";
import { useApiUtil } from "providers/ApiUtil";
import formatFormData from "../format_form_data";

function WorkplaceForm({ handleReset, user, currentFormData = {}, idx }) {
  const [disableSubmit, setDisableSubmit] = useState(!idx);
  const [workHere, setWorkHere] = useState(
    currentFormData.id ? currentFormData.currentEmployment : true
  );
  const { addProfileDetail } = useApiUtil();

  const requiredFields = ["company"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      requiredFields.every((field) => e.target.elements[field]?.value.length)
    ) {
      const fields = [
        "company",
        "position",
        "cityTown",
        "description",
        "currentEmployment",
        "startYear",
        "startMonth",
        "startDay",
        "endYear",
        "endMonth",
        "endDay",
        "order",
      ];

      const workplaceDetails = formatFormData(
        fields,
        e.target.elements
      );

      addProfileDetail(
        user,
        workplaceDetails,
        "workplace",
        currentFormData.id,
        idx
      );

      handleReset();
    } else console.log(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={(e) => {
        if (e.target.id === "currentEmployment") setWorkHere(e.target.checked);
        if (disableSubmit) setDisableSubmit(false);
      }}
    >
      <TextInput
        label="company"
        name="Company"
        defaultInput={currentFormData.company}
      />
      <TextInput
        label="position"
        name="Position"
        defaultInput={currentFormData.position}
      />
      <TextInput
        label="cityTown"
        name="City/Town"
        defaultInput={currentFormData.cityTown}
      />
      <TextInput
        label="description"
        name="Description"
        rows={3}
        defaultInput={currentFormData.description}
      />
      <div className="employment_length">
        <h4>Time Period</h4>
        <CheckBox
          label="currentEmployment"
          text="I currently work here"
          isChecked={
            currentFormData.id ? currentFormData.currentEmployment : true
          }
        />
        <DatePicker
          dateRange={!workHere}
          defaultFromYear={currentFormData.startYear}
          defaultFromMonth={currentFormData.startMonth}
          defaultFromDay={currentFormData.startDay}
          defaultToYear={currentFormData.endYear}
          defaultToMonth={currentFormData.endMonth}
          defaultToDay={currentFormData.endDay}
        />
      </div>
      <FormFooter handleReset={handleReset} disableSubmit={disableSubmit} />
    </form>
  );
}

export default WorkplaceForm;
