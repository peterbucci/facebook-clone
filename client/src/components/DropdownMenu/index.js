import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./styles/dropdown_menu.css";
import Menu from "./menu";
import getTextWidth from "common/get_text_width";
import determinePos from "./determinePos";
import BackgroundIcon from "common/icons/BackgroundIcon";

function DropdownMenu({
  children,
  listItems,
  listOrder,
  label,
  buttonText,
  buttonIcon,
  buttonIconRight,
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
  const [menuHeight, setMenuHeight] = useState(0)
  const [menuProps, setMenuProps] = useState({});
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const listRef = useRef(null);

  const handleClick = () => setVisible(!visible);

  useEffect(() => {
    const input = document.getElementById(label);
    if (input) {
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(input, buttonText);
      var ev2 = new Event("input", { bubbles: true });
      input.dispatchEvent(ev2);
      setVisible(false)
    }
  }, [buttonText, label]);

  useEffect(() => {
    const height = label ? (window.innerHeight - (buttonRef.current?.getBoundingClientRect().top + buttonRef.current?.offsetHeight)) + "px" : null
    setMenuHeight(height)
  }, [visible, label])

  useEffect(() => {
    setTextWidth(width ?? getTextWidth(Object.keys(listItems)));
  }, [listItems, width]);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const button = buttonRef.current;
    const handleMouseUp = (e) => {
      if (!menu?.contains(e.target) && !button?.contains(e.target) && visible) {
        setVisible(false);
      }
    };

    const onResize = () =>
      setMenuProps(
        determinePos(align, right, left, buttonRef, menuRef, textWidth)
      );

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
        <div onClick={handleClick} className="dropdown_button" ref={buttonRef}>
          {buttonIcon !== "none" && !buttonIconRight && (
            <BackgroundIcon
              icon={buttonIcon ?? "ellipsis"}
              width="16px"
              height="16px"
            />
          )}
          {buttonText && (
            <>
              {!label ? (
                <div className="dropdown_button_text">{buttonText}</div>
              ) : (
                <input
                  type="text"
                  id={label}
                  className="dropdown_button_text"
                  readOnly={true}
                  style={{
                    width: (buttonText.length + 2) +  "ch",
                  }}
                />
              )}
            </>
          )}
          {buttonIcon !== "none" && buttonIconRight && (
            <BackgroundIcon
              icon={buttonIcon ?? "ellipsis"}
              width="16px"
              height="16px"
            />
          )}
        </div>
      )}

      {visible ? (
        children ? (
          children(menuRef, menuProps)
        ) : (
          <Menu
            menuRef={menuRef}
            listRef={listRef}
            width={width}
            height={menuHeight}
            listItems={listItems}
            listOrder={listOrder}
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
