import TextInput from "components/TextInput";
import FormFooter from "components/ProfileDetails/FormFooter";

function AddressForm({ handleReset }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="address" name="Address" />
      <TextInput label="cityTown" name="City/Town" />
      <TextInput label="zip" name="ZIP" />
      <TextInput label="neighborhood" name="Neighborhood" />
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default AddressForm;
