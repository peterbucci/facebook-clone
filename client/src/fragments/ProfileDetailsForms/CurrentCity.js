import TextInput from "components/TextInput";
import FormFooter from "fragments/ProfileDetails/FormFooter";


function CurrentCityForm({handleReset}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="currentCity" name="Current city" />
      <FormFooter handleReset={handleReset}  />
    </form>
  );
}

export default CurrentCityForm;