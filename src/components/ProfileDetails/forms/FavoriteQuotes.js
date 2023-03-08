import TextInput from "components/TextInput";
import FormFooter from "components/ProfileDetails/FormFooter";

function FavoriteQuotesForm({ handleReset }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="favoriteQuotes" name="Favorite Quotes" rows={3} />
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default FavoriteQuotesForm;
