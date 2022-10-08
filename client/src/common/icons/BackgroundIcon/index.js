import  * as icons  from "resources/strings/background_icons"
import "./styles/background_icon.css";
const { REACT_APP_ICONS_FOLDER } = process.env;

function BackgroundIcon({ icon, ...rest }) {
  const {file, position, ...additionalStyles} = icons[icon]
  return (
    <div
      className="background_icon"
      style={{
        backgroundImage: ` url(${REACT_APP_ICONS_FOLDER}${file}.png)`,
        backgroundPosition: `${position[0]}px ${position[1]}px`,
        ...additionalStyles,
        ...rest,
      }}
    ></div>
  );
}

export default BackgroundIcon;