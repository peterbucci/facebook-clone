import BackgroundIcon from "common/icons/BackgroundIcon"
import "./styles/privacy_setting.css"

const options = {
  public: {
    text: "Public",
    icon: "globe"
  }
}

function PrivacySetting({ selected }) {
  return (
    <div className="privacy_button"><BackgroundIcon icon="globe" />{options[selected].text}</div>
  )
}

export default PrivacySetting