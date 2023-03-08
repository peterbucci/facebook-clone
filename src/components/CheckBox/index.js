import { useState } from "react";
import "./styles/check_box.css"

function CheckBox({ label, text, isChecked = false }) {
  const [checked, setChecked] = useState(isChecked)
  return (
    <div className="check_box_component">
      <input type="checkbox" id={label} onChange={() => setChecked(!checked)} checked={checked} />
      <label htmlFor={label}>{text}</label>
    </div>
  );
}

export default CheckBox;
