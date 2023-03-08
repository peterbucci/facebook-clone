import BackgroundIcon from "common/icons/BackgroundIcon";
import "./styles/privacy_setting.css";

const options = {
  public: {
    text: "Public",
    icon: "globe",
  }
};

function PrivacySetting({ selected, iconOnly, ...additionalProps }) {
  const { text, icon } = options[selected]
  return iconOnly ? (
    <BackgroundIcon icon={`${icon}16`} {...additionalProps} />
  ) : (
    <div className="privacy_button">
      <BackgroundIcon icon={icon} />
      {text}
    </div>
  );
}

export default PrivacySetting;
