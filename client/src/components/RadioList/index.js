import { useState } from "react";
import "./styles/radio_list.css";

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function RadioList({ list, name, defaultItem }) {
  const [checkedItem, setCheckedItem] = useState(defaultItem);
  return (
    <div className="radio_list">
      {list.map((item) => {
        const label = lowerCaseFirstLetter(item).replace(/\s/g, "");
        return (
          <label htmlFor={label} key={label} className="radio_list_label">
            <input
              type="radio"
              id={label}
              class="radio_list_button"
              name={name}
              checked={item === checkedItem}
              onChange={() => setCheckedItem(item)}
            />
            <span class="radio_list_text">{item}</span>
          </label>
        );
      })}
    </div>
  );
}

export default RadioList;
