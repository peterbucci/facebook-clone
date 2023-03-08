import CheckBox from "components/CheckBox";
import FormFooter from "components/ProfileDetails/FormFooter";

function PoliticalViewsForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container_add_interested_in">
        <h4>Interested in</h4>
        <CheckBox label="interestedWomen" text="Women" />
        <CheckBox label="interestedMen" text="Men" />
      </div>

      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default PoliticalViewsForm;
