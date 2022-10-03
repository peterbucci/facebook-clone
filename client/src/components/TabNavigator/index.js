import { Link } from "react-router-dom";
import "./styles/tab_navigator.css";

function TabNavigator({ listItems, active }) {
  return (
    <div className="tab_navigator">
      <ul>
        {Object.keys(listItems).map((key) => {
          const { text, Icon, onClick, secondaryKeys, additionalClasses } =
            listItems[key];
          const item = Icon ? (
            <>
              {text}
              <Icon />
            </>
          ) : (
            text
          );

          const classes =
            (active(key, secondaryKeys) ? "active" : "") +
            (additionalClasses ? " " + additionalClasses : "");

          return (
            <li className={classes}>
              {typeof onClick === "string" ? (
                <Link to={onClick}>{item}</Link>
              ) : (
                <span onClick={onClick}>{item}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TabNavigator;
