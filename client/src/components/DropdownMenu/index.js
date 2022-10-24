import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./styles/dropdown_menu.css";
import Menu from "./menu";
import getTextWidth from "common/get_text_width";
import determinePos from "./determinePos";
import BackgroundIcon from "common/icons/BackgroundIcon";
import TextInput from "components/TextInput";

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
  inputButton,
}) {
  const [textWidth, setTextWidth] = useState(null);
  const [visible, setVisible] = useState(false);
  const [menuHeight, setMenuHeight] = useState(null);
  const [menuProps, setMenuProps] = useState({});
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const listRef = useRef(null);

  const ButtonIcon = () => {
    return <BackgroundIcon icon={buttonIcon ? buttonIcon : "ellipsis"} />;
  };

  const handleClick = () => setVisible(!visible);

  useEffect(() => {
    const height = label
      ? window.innerHeight -
        (buttonRef.current?.getBoundingClientRect().top +
          buttonRef.current?.offsetHeight) +
        "px"
      : null;
    setMenuHeight(height);
  }, [visible, label]);

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
    <div
      className={
        customContainerClass ??
        `dropdown_container${label ? " select_dropdown" : ""}`
      }
    >
      {customButton ? (
        customButton(handleClick, buttonRef)
      ) : inputButton ? (
        <TextInput
          label={label}
          name={inputButton}
          outsideValue={buttonText}
          handleClick={handleClick}
          inputRef={buttonRef}
          icon={buttonIcon ? () => <ButtonIcon /> : null}
        />
      ) : (
        <div onClick={handleClick} className="dropdown_button" ref={buttonRef}>
          {buttonIcon !== "none" && !buttonIconRight && <ButtonIcon />}
          {buttonText && (
            <div className="dropdown_button_text">{buttonText}</div>
          )}
          {label && <input id={label} type="hidden" value={buttonText} />}
          {buttonIcon !== "none" && buttonIconRight && <ButtonIcon />}
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
            setVisible={setVisible}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default DropdownMenu;
