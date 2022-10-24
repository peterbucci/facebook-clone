import { useState } from "react";
import TextInput from "components/TextInput";
import FormFooter from "components/ProfileDetails/FormFooter";
import BackgroundIcon from "common/icons/BackgroundIcon";
import SelectDropdown from "components/SelectDropdown";

function SocialLinkForm({ handleReset }) {
  const [numberOfTextBoxes, setNumberOfTextBoxes] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
  };

  return (
    <form onSubmit={handleSubmit}>
      {[...Array(numberOfTextBoxes).keys()].map((idx) => {
        return (
          <div className="container_add_social_link">
            <TextInput label={`username${idx}`} name="Username" />
            <SelectDropdown
              label={`social${idx}`}
              defaultSelection="Instagram"
              listOrder={[
                "Instagram",
                "Twitter",
                "Snapchat",
                "YouTube",
                "TikTok",
                "Twitch",
                "WhatsApp",
                "LINE",
                "WeChat",
                "Kik",
                "Pinterest",
                "Tumblr",
                "Ask.fm",
                "SoundCloud",
                "Spotify",
                "LinkedIn",
                "Skype",
                "QQ",
              ]}
            />
          </div>
        );
      })}
      <div
        className="button_add_form_field"
        onClick={() => setNumberOfTextBoxes(numberOfTextBoxes + 1)}
      >
        <BackgroundIcon icon="plus" />
        <span>Add a social link</span>
      </div>
      <FormFooter handleReset={handleReset} />
    </form>
  );
}

export default SocialLinkForm;
