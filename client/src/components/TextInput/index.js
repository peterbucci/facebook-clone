import { useEffect, useState } from "react";
import "./styles/text_input.css";

function TextInput({
  name,
  rows = 1,
  classes,
  label,
  disabled = false,
  handleClick,
  inputRef,
  outsideValue,
  icon,
  defaultInput = ""
}) {
  const [value, setValue] = useState(defaultInput);
  const [focused, setFocused] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, "350");
    }
  }, [clicked]);

  useEffect(() => {
    if (disabled) setValue("");
  }, [disabled]);

  return (
    <div
      className={`text_box${classes ? " " + classes : ""}${
        focused ? " outline" : ""
      }${clicked ? " clicked" : ""}${typeof handleClick === "function" ? " cursor_pointer" : ""}`}
      ref={inputRef}
      onClick={() => {
        if (disabled) setClicked(true);
        if (handleClick) handleClick();
      }}
    >
      {rows > 1 ? (
        <textarea
          id={label}
          className={`text_box_input text_area${disabled ? " disabled" : ""}`}
          value={outsideValue || value}
          onChange={(e) => setValue(e.target.value)}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled || typeof handleClick === "function"}
        />
      ) : (
        <input
          id={label}
          className={`text_box_input text${disabled ? " disabled" : ""}`}
          type="text"
          value={outsideValue || value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled || typeof handleClick === "function"}
        />
      )}
      <label
        htmlFor={label}
        className={`text_box_placeholder${focused ? " focused" : ""}${
          value.length || outsideValue ? " text_entered" : ""
        }${disabled ? " disabled" : ""}`}
      >
        {name}
      </label>
      {icon && icon()}
    </div>
  );
}

export default TextInput;
