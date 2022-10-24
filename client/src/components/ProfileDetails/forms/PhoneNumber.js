import TextInput from "components/TextInput";
import FormFooter from "components/ProfileDetails/FormFooter";

function PhoneNumberForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="phone" name="Phone Number" />
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default PhoneNumberForm;

