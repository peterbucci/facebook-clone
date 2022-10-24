import TextInput from "components/TextInput";
import FormFooter from "components/ProfileDetails/FormFooter";


function HometownForm({handleReset}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="hometown" name="Hometown" />
      <FormFooter handleReset={handleReset}  />
    </form>
  );
}

export default HometownForm;