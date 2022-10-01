import "./styles/background_icon.css";
const { REACT_APP_ICONS_FOLDER } = process.env;

function BackgroundIcon({ image, position, ...rest }) {
  return (
    <div
      className="background_icon"
      style={{
        backgroundImage: ` url(${REACT_APP_ICONS_FOLDER}${image}.png)`,
        backgroundPosition: `${position[0]}px ${position[1]}px`,
        ...rest,
      }}
    ></div>
  );
}

export default BackgroundIcon;