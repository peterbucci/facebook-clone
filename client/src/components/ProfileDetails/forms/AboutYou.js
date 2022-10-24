import TextInput from "components/TextInput";
import FormFooter from "components/ProfileDetails/FormFooter";

function AboutYouForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="aboutYou" name="About you" rows={3} />
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default AboutYouForm;
