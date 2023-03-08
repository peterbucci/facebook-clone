import DatePicker from "components/DatePicker";
import TextInput from "components/TextInput";
import FormFooter from "components/ProfileDetails/FormFooter";

function AddCityForm({ handleReset }) {
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="addCity" name="City" />
      <DatePicker
        dateRange={false}
        beforeText="Date moved"
        defaultFromYear={currentYear}
      />
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default AddCityForm;
