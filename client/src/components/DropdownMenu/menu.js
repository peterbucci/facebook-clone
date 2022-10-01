import { Link } from "react-router-dom";

function Menu({ menuRef, width, listItems, menuProps }) {
  return (
    <div
      className="dropdown_menu"
      ref={menuRef}
      tabIndex={1}
      style={{ width: width ? width + "px" : "auto", ...menuProps }}
    >
      <ul>
        {Object.keys(listItems).map((key) => {
          const onClick = listItems[key].onClick;
          const Icon = listItems[key].Icon
          const text = Icon ? (
            <>
              <div className="dropdown_menu_icon">
                <Icon />
              </div>
              {key}
            </>
          ) : (
            key
          );


          return typeof onClick === "string" ? (
            <li>
              <Link to={onClick} className={`text_container${Icon ? " with_icons" : ""}`}>{text}</Link>
            </li>
          ) : (
            <li onClick={onClick} className={`text_container${Icon ? " with_icons" : ""}`}>{text}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
