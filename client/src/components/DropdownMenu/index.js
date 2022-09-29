import { useEffect, useState, useRef } from "react";
import "./styles/dropdown_menu.css";

function getTextWidth(el, font) {
  var text = Array.isArray(el)
    ? el.reduce(function (a, b) {
        return a.length > b.length ? a : b;
      })
    : el;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = font || getComputedStyle(document.body).font;

  return context.measureText(text).width + 32;
}

function DropdownMenu({ children, listItems, right, width }) {
  const [textWidth, setTextWidth] = useState(
    width ? width : getTextWidth(Object.keys(listItems))
  );
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const distanceFromRight = window.innerWidth * right;
  const menuRight = -(
    window.innerWidth -
    distanceFromRight -
    buttonRef.current?.getBoundingClientRect().right
  );
  const screenTooNarrow =
    buttonRef.current?.getBoundingClientRect().left + textWidth >=
    window.innerWidth;

  const handleClick = () => setVisible(!visible);

  useEffect(() => {
    setTextWidth(width ? width : getTextWidth(Object.keys(listItems)));
  }, [listItems, width]);

  useEffect(() => {
    if (visible) dropdownRef.current.focus();

    const handleMouseUp = (e) => {
      if (
        document.activeElement !== dropdownRef.current &&
        !buttonRef.current.contains(e.target) &&
        visible
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [visible]);

  return (
    <div className="dropdown_container">
      <div
        onClick={handleClick}
        className="profile_card_dropdown_button dropdown_button"
        ref={buttonRef}
      >
        <div className="profile_card_dropdown_button_text"></div>
      </div>
      {visible && (
        <div
          className="dropdown_menu"
          ref={dropdownRef}
          tabIndex={1}
          style={{ width: width ? width + "px" : "auto", ...(screenTooNarrow ? { right: menuRight } : { left: 0 })}}
        >
          {children ?? (
            <ul>
              {Object.keys(listItems).map((itemText) => (
                <li>{itemText}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
