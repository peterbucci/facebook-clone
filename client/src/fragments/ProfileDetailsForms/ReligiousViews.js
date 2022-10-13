import { useState } from "react";
import TextInput from "components/TextInput";
import FormFooter from "fragments/ProfileDetails/FormFooter";

function ReligiousViewsForm({ handleReset }) {
  const [viewsEntered, setViewsEntered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={(e) => {
        switch (e.target.id) {
          case "religiousViews":
            setViewsEntered(e.target.value.length > 0);
            break;
          default:
            break;
        }
      }}
    >
      <TextInput label="religiousViews" name="Religious Views" />
      <TextInput
        label="religiousViewsDescription"
        name="Description"
        rows={3}
        disabled={!viewsEntered}
      />
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default ReligiousViewsForm;
