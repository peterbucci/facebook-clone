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
        {Object.keys(listItems).map((text) => {
          const onClick = listItems[text].onClick;
          const Icon = listItems[text].Icon
          const item = Icon ? (
            <>
              <div className="dropdown_menu_icon">
                <Icon />
              </div>
              {text}
            </>
          ) : (
            text
          );


          return typeof onClick === "string" ? (
            <li>
              <Link to={onClick} className={`item_container${Icon ? " with_icons" : ""}`}>{item}</Link>
            </li>
          ) : (
            <li onClick={onClick} className={`item_container${Icon ? " with_icons" : ""}`}>{item}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
