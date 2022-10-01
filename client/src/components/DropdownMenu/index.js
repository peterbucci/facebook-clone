import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./styles/dropdown_menu.css";
import Menu from "./menu";
import getTextWidth from "common/get_text_width";
import determinePos from "./determinePos";
import BackgroundIcon from "common/icons/BackgroundIcon";

function DropdownMenu({
  children,
  listItems,
  buttonText,
  buttonIcon,
  right,
  left,
  width,
  align,
  customContainerClass,
  customMenuClass,
  customButton,
}) {
  const [textWidth, setTextWidth] = useState(null);
  const [visible, setVisible] = useState(false);
  const [menuProps, setMenuProps] = useState({});
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleClick = () => setVisible(!visible);

  useEffect(() => {
    setTextWidth(width ?? getTextWidth(Object.keys(listItems)));
  }, [listItems, width]);

  useLayoutEffect(() => {
    const handleMouseUp = (e) => {
      if (
        !menuRef.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target) &&
        visible
      ) {
        setVisible(false);
      }
    };

    const onResize = () =>
      setMenuProps(determinePos(align, right, left, buttonRef, menuRef, textWidth));

    onResize();
    window.addEventListener("resize", onResize);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", onResize);
    };
  }, [visible, align, right, left, textWidth]);

  return (
    <div className={customContainerClass ?? `dropdown_container`}>
      {customButton ? (
        customButton(handleClick, buttonRef)
      ) : (
        <div
          onClick={handleClick}
          className="dropdown_button"
          ref={buttonRef}
        >
          <BackgroundIcon
            image={buttonIcon?.file ?? "RyUtCFgSzDn"}
            position={buttonIcon?.pos ?? [-119, -147]}
            width="16px"
            height="16px"
          />
          {buttonText && <div className="dropdown_button_text">{buttonText}</div>}
        </div>
      )}

      {visible ? (
        children ? (
          children(menuRef, menuProps)
        ) : (
          <Menu
            menuRef={menuRef}
            width={width}
            listItems={listItems}
            menuProps={menuProps}
            customMenuClass={customMenuClass}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default DropdownMenu;
