import { useState } from "react";
import "./styles/text_box.css";

function TextBox({ name, rows = 1, classes, label }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`text_box${classes ? " " + classes : ""}${
        focused ? " outline" : ""
      }`}
    >
      {rows > 1 ? (
        <textarea
          id={label}
          className="text_box_input text_area"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={label}
          className="text_box_input text"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      <label
        htmlFor={label}
        className={`text_box_placeholder${focused ? " focused" : ""}${
          value.length ? " text_entered" : ""
        }`}
      >
        {name}
      </label>
    </div>
  );
}

export default TextBox;
