import { useState } from "react";
import "./styles/date_picker.css";
import NewDate from "./NewDate";

function DatePicker({
  dateRange = true,
  beforeText = "From",
  startingYear = 1985,
  orderBy="start",
  customOrder,
  ...props
}) {
  const [timestamp, setTimestamp] = useState(new Date());

  return (
    <div className="date_select">
      {!dateRange && <span className="date_select_from">{beforeText}</span>}
      <input type="hidden" value={timestamp} id="order" />
      <NewDate
        defaultYear={props.defaultFromYear}
        defaultMonth={props.defaultFromMonth}
        defaultDay={props.defaultFromDay}
        startingYear={startingYear}
        setTimestamp={orderBy === "start" ? setTimestamp : null}
        containerClass={customOrder ? "" : "start_date"}
        label="start"
        order={customOrder || ["Year", "Month", "Day"]}
        alwaysVisible={customOrder ? true : false}
      />

      {dateRange && (
        <>
          <span className="date_select_to">to</span>
          <NewDate
            defaultYear={props.defaultToYear}
            defaultMonth={props.defaultToMonth}
            defaultDay={props.defaultToDay}
            startingYear={startingYear}
            setTimestamp={orderBy === "end" ? setTimestamp : null}
            containerClass="end_date"
            label="end"
            order={customOrder || ["Year", "Month", "Day"]}
          />
        </>
      )}
    </div>
  );
}

export default DatePicker;
