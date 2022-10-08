import DropdownMenu from "components/DropdownMenu";
import { useLayoutEffect, useState } from "react";
import "./styles/select_dropdown.css";
import BackgroundIcon from "common/icons/BackgroundIcon";

function SelectDropdown({ type, label, ...props }) {
  const [listItems, setListItems] = useState({});
  const [listOrder, setListOrder] = useState([])
  const [selected, setSelected] = useState(type);

  function range(start, end, reverse = false) {
    return Array(end - start + 1).fill().map((_, idx) => reverse ? end - idx : start + idx)
  }

  useLayoutEffect(() => {
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const startingYear = props.startingYear
    const startingMonth = props.startingMonth
    const startingDate = props.startingDate
    const selectedYear = props.selectedYear
    const selectedMonth = MONTHS.indexOf(props.selectedMonth) + 1
    const currentYear = new Date().getFullYear() 
    const currentMonth = new Date().getMonth()
    if (type === "Year") {
      const thisOrder = ["Year", ...range(startingYear, currentYear + 1, true)]
      const thisItems = thisOrder.reduce((items, item) => ({
        [item]: {
          onClick: () => setSelected(item)
        },
        ...items
      }), {})
      setListOrder(thisOrder)
      setListItems(thisItems);
    } else if (type === "Month") {
      const thisOrder = ["Month", ...MONTHS.slice(startingMonth, MONTHS.length)]
      const thisItems = thisOrder.reduce((items, item) => ({
        [item]: {
          onClick: () => setSelected(item)
        },
        ...items
      }), {})
      setListOrder(thisOrder)
      setListItems(thisItems);
    } else if (type === "Day") {
      const thisOrder = ["Day", ...range(startingDate, new Date(selectedYear, selectedMonth, 0).getDate())]
      const thisItems = thisOrder.reduce((items, item) => ({
        [item]: {
          onClick: () => setSelected(item)
        },
        ...items
      }), {})
      setListOrder(thisOrder)
      setListItems(thisItems);
    }
  }, [type, props.startingYear, props.startingMonth, props.startingDate, props.selectedYear, props.selectedMonth]);

  return (
    <DropdownMenu
      listItems={listItems}
      listOrder={listOrder}
      label={label}
      buttonIcon="arrowDown"
      buttonIconRight={true}
      buttonText={selected}
      width={344}
      right={.02}
      align="left"
    />
  );
}

export default SelectDropdown;
