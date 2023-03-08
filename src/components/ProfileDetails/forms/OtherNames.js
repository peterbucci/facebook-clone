import CheckBox from "components/CheckBox";
import SelectDropdown from "components/SelectDropdown";
import TextInput from "components/TextInput";
import FormFooter from "components/ProfileDetails/FormFooter";

function OtherNamesForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container__form_element">
        <SelectDropdown
          label="nameType"
          listOrder={[
            "Nickname",
            "Maiden Name",
            "Alternate Spelling",
            "Married Name",
            "Father's Name",
            "Birth Name",
            "Former Name",
            "Name with Title",
            "Other",
          ]}
          textInputButton="Name type"
        />
        <TextInput label="name" name="Name" />
        <CheckBox label="showAtTop" text="Show at top of profile" />
        <div>
          Other names are always public and help people find you on Facebook.
        </div>
      </div>

      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default OtherNamesForm;
