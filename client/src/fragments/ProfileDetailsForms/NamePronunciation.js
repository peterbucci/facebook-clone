import TextInput from "components/TextInput";
import FormFooter from "fragments/ProfileDetails/FormFooter";

function NamePronunciationForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container__form_element">
        <TextInput label="firstName" name="First Name (name)" />
        <TextInput label="lastName" name="Last Name (name)" />
        <div>
          Name pronunciations are always public and let people know how to say
          your name.
        </div>
      </div>
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default NamePronunciationForm;
