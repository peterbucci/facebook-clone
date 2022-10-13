import DatePicker from "components/DatePicker";
import TextInput from "components/TextInput";
import FormFooter from "fragments/ProfileDetails/FormFooter";

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
        fromText="Date moved"
        fromTextVisibility={true}
        defaultFromYear={currentYear}
        toTextVisibility={false}
        toDateVisibility={false}
      />
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default AddCityForm;
