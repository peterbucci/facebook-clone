import TextInput from "components/TextInput";
import CheckBox from "components/CheckBox";
import DatePicker from "components/DatePicker";
import FormFooter from "components/ProfileDetails/FormFooter";
import RadioList from "components/RadioList";
import { useApiUtil } from "providers/ApiUtil";
import formatFormData from "../format_form_data";

function CollegeForm({ handleReset, user, currentFormData = {}, idx }) {
  const { addProfileDetail } = useApiUtil();
  const requiredFields = ["school"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      requiredFields.every((field) => e.target.elements[field]?.value.length)
    ) {
      const fields = [
        "school",
        "startYear",
        "startMonth",
        "startDay",
        "endYear",
        "endMonth",
        "endDay",
        "order",
        "description",
        "concentrationOne",
        "concentrationTwo",
        "concentrationThree",
        "college",
        "graduateSchool",
        "degree",
        "graduated"
      ];

      const workplaceDetails = formatFormData(
        fields,
        e.target.elements
      );

      addProfileDetail(
        user,
        workplaceDetails,
        "college",
        currentFormData.id,
        idx
      );

      handleReset();
    } else console.log(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="school" name="School" />
      <h4>Time Period</h4>
      <DatePicker orderBy="end" />
      <CheckBox label="graduated" text="Graduated" isChecked={true} />
      <TextInput label="description" name="Description" rows={3} />
      <h4>Concentrations</h4>
      <TextInput label="concentrationOne" name="Concentration" />
      <TextInput label="concentrationTwo" name="Concentration" />
      <TextInput label="concentrationThree" name="Concentration" />
      <h4>Attended For</h4>
      <RadioList list={["College", "Graduate School"]} name="attendedFor" defaultItem="College" />
      <TextInput label="degree" name="Degree" />
      <FormFooter handleReset={handleReset}  />
    </form>
  );
}

export default CollegeForm;
