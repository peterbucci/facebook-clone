import { useState, useLayoutEffect } from "react";
import "./styles/date_picker.css";
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

function DatePicker({
  fromText = "From",
  fromTextVisibility,
  fromDateVisibility = true,
  toTextVisibility = true,
  toDateVisibility = true,
  startingYear = 1985,
  customOrder,
  ...props
}) {
  const [fromDate, setFromDate] = useState({
    year: props.defaultFromYear,
    month: props.defaultFromMonth,
    day: props.defaultFromDay,
  });
  const [toDate, setToDate] = useState({});
  const [fromYearOrder, setFromYearOrder] = useState(["Year"]);
  const [toYearOrder, setToYearOrder] = useState(["Year"]);
  const [fromDayOrder, setFromDayOrder] = useState(["Day"]);
  const [toDayOrder, setToDayOrder] = useState(["Day"]);

  const setDate = (setDate, key, selection) => {
    setDate((prevDate) => ({
      ...prevDate,
      [key]:
        isNaN(selection) && selection.toLowerCase() === key ? null : selection,
    }));
  };

  useLayoutEffect(() => {
    const currentYear = new Date().getFullYear();
    const order = ["Year", ...range(startingYear, currentYear + 1, true)];
    setFromYearOrder(order);
    setToYearOrder(order);
  }, [startingYear]);

  useLayoutEffect(() => {
    if (fromDate.month && fromDate.month !== "Month") {
      const selectedMonth = MONTHS.indexOf(fromDate.month) + 1;
      const order = [
        "Day",
        ...range(1, new Date(fromDate.year, selectedMonth, 0).getDate()),
      ];
      setFromDayOrder(order);
    }
    if (toDate.month && toDate.month !== "Month") {
      const selectedMonth = MONTHS.indexOf(toDate.month) + 1;
      const order = [
        "Day",
        ...range(1, new Date(toDate.year, selectedMonth, 0).getDate()),
      ];
      setToDayOrder(order);
    }
  }, [fromDate.month, fromDate.year, toDate.month, toDate.year]);

  const buildDatePicker = (order) => {
    return (
      <div>
        {order.map((currentSelect) => {
          const listOrder =
            currentSelect === "Year"
              ? fromYearOrder
              : currentSelect === "Day"
              ? fromDayOrder
              : ["Month", ...MONTHS];
          return (
            <SelectDropdown
              label={`start${currentSelect}`}
              defaultSelection={props[`defaultFrom${currentSelect}`]}
              listOrder={listOrder}
              onSelect={(select) => {
                setDate(setFromDate, currentSelect.toLowerCase(), select);
                if (select === currentSelect)
                  setDate(setFromDate, "month", "Month");
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="date_select">
      {customOrder ? (
        buildDatePicker(customOrder)
      ) : (
        <>
          {fromTextVisibility && (
            <span className="date_select_from">{fromText}</span>
          )}
          {fromDateVisibility && (
            <div className="start_date">
              <SelectDropdown
                label="startYear"
                defaultSelection={props.defaultFromYear}
                listOrder={fromYearOrder}
                onSelect={(select) => {
                  setDate(setFromDate, "year", select);
                  if (select === "Year") setDate(setFromDate, "month", "Month");
                }}
              />
              {fromDate.year && (
                <SelectDropdown
                  label="startMonth"
                  defaultSelection={props.defaultFromMonth}
                  listOrder={["Month", ...MONTHS]}
                  onSelect={(select) => setDate(setFromDate, "month", select)}
                />
              )}
              {fromDate.month && (
                <SelectDropdown
                  label="startDay"
                  defaultSelection={props.defaultFromDay}
                  listOrder={fromDayOrder}
                />
              )}
            </div>
          )}
          {toTextVisibility && <span className="date_select_to">to</span>}
          {toDateVisibility && (
            <div className="end_date">
              <SelectDropdown
                label="endYear"
                listOrder={toYearOrder}
                onSelect={(select) => {
                  setDate(setToDate, "year", select);
                  if (select === "Year") setDate(setToDate, "month", "Month");
                }}
              />
              {toDate.year && (
                <SelectDropdown
                  label="endMonth"
                  listOrder={["Month", ...MONTHS]}
                  onSelect={(select) => setDate(setToDate, "month", select)}
                />
              )}
              {toDate.month && (
                <SelectDropdown label="endDay" listOrder={toDayOrder} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DatePicker;
