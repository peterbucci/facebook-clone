import { Link } from "react-router-dom";

function Menu({ menuRef, listRef, height, width, listItems, listOrder, menuProps, setVisible }) {
  const containerStyle = height ? { maxHeight: height,  overflow: "scroll" } : {} 
  const listStyle = containerStyle.maxHeight ? { maxHeight: height, } : {}

  return (
    <div
      className="dropdown_menu"
      ref={menuRef}
      tabIndex={1}
      style={{ width: width ? width + "px" : "auto", ...containerStyle, ...menuProps }}
    >
      <ul ref={listRef} >
        {listOrder.map((text, i) => {
          const onClick = () => {
            listItems[text].onClick()
            setVisible(false)
          };
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
            <li key={i}>
              <Link to={onClick} className={`item_container${Icon ? " with_icons" : ""}`}>{item}</Link>
            </li>
          ) : (
            <li key={i} onClick={onClick} className={`item_container${Icon ? " with_icons" : ""}`}>{item}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
