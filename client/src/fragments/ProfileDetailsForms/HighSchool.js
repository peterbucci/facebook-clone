import TextInput from "components/TextInput";
import CheckBox from "components/CheckBox";
import DatePicker from "components/DatePicker";
import FormFooter from "fragments/ProfileDetails/FormFooter";

function HighSchoolForm({ handleReset }) {
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
      <FormFooter handleReset={handleReset}  />
    </form>
  );
}

export default HighSchoolForm;