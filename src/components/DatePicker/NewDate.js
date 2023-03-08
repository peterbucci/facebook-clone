import { useState, useLayoutEffect, useEffect } from "react";
import SelectDropdown from "components/SelectDropdown";

function range(start, end, reverse = false) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => (reverse ? end - idx : start + idx));
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function NewDate({
  startingYear,
  setTimestamp,
  containerClass,
  label,
  order,
  alwaysVisible,
  ...props
}) {
  const [yearListItems, setYearListItems] = useState(["Year"]);
  const [dayListItems, setDayListItems] = useState(["Day"]);
  const monthListItems = ["Month", ...MONTHS];
  const [date, setDate] = useState({
    year: props.defaultYear,
    month: props.defaultMonth,
    day: props.defaultDay,
  });

  const handleSetDate = (key, selection) => {
    setDate((prevDate) => ({
      ...prevDate,
      [key]:
        isNaN(selection) && selection.toLowerCase() === key ? null : selection,
    }));
  };

  const onSelect = (el, select) => {
    handleSetDate(el.toLowerCase(), select);
    if (select === el) {
      if (el === "Year") handleSetDate("month", "Month");
      if (el === "Year" || el === "Month")
        handleSetDate("day", "Day");
    }
  }

  const buildDate = (order) => {
    return (
      <div>
        {order.map((el, i, arr) => {
          const listOrder =
            el === "Year"
              ? yearListItems
              : el === "Month"
              ? monthListItems
              : dayListItems;

          return alwaysVisible || i === 0 || date[arr[i - 1].toLowerCase()] ? (
            <SelectDropdown
              label={label + el}
              defaultSelection={props[`default${el}`]}
              listOrder={listOrder}
              onSelect={(select) => onSelect(el, select)}
            />
          ) : (
            <></>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (date.year && setTimestamp) {
      const year = date.year;
      const month = date.month ? MONTHS.indexOf(date.month) : 0;
      const day = date.day || 1;
      const timestamp = new Date(year, month, day);
      setTimestamp(timestamp);
    }
  }, [date, setTimestamp]);

  useLayoutEffect(() => {
    const currentYear = new Date().getFullYear();
    const order = ["Year", ...range(startingYear, currentYear + 1, true)];
    setYearListItems(order);
  }, [startingYear]);

  useLayoutEffect(() => {
    if (date.month && date.month !== "Month") {
      const selectedMonth = MONTHS.indexOf(date.month) + 1;
      const order = [
        "Day",
        ...range(1, new Date(date.year, selectedMonth, 0).getDate()),
      ];
      setDayListItems(order);
    }
  }, [date.month, date.year]);

  return (
    <div className={containerClass}>
      {buildDate(order)}
    </div>
  );
}

export default NewDate