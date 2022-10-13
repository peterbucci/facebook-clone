import DatePicker from "components/DatePicker";
import PrivacySetting from "components/PrivacySetting";
import FormFooter from "fragments/ProfileDetails/FormFooter";
import { Link } from "react-router-dom";

function BirthdayForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container__form_element">
        <div className="container__birthday_row">
          <DatePicker
            defaultFromYear={1985}
            defaultFromMonth="January"
            defaultFromDay={1}
            customOrder={["Month", "Day"]}
          />
          <PrivacySetting selected="public" />
        </div>
        <div className="container__birthday_row">
          <DatePicker customOrder={["Year"]} />
          <PrivacySetting selected="public" />
        </div>

        <div className="footer_message">
          You can only edit your birthday a limited number of times.{" "}
          <Link to="photos">Learn More</Link>
        </div>
      </div>
      <FormFooter handleReset={handleReset} noPrivacy={true} />
    </form>
  );
}

export default BirthdayForm;
