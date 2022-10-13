import TextInput from "components/TextInput";
import CheckBox from "components/CheckBox";
import DatePicker from "components/DatePicker";
import FormFooter from "fragments/ProfileDetails/FormFooter";
import RadioList from "components/RadioList";

function CollegeForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="school" name="School" />
      <h4>Time Period</h4>
      <DatePicker />
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
