import TextInput from "components/TextInput";
import FormFooter from "fragments/ProfileDetails/FormFooter";

function LanguageForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="languages" name="Languages" />
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default LanguageForm;
