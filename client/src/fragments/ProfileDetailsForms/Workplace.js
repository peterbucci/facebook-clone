import { useState } from "react";
import CheckBox from "components/CheckBox";
import SelectDropdown from "components/SelectDropdown";
import TextBox from "components/TextBox";

function WorkplaceForm({ handleReset }) {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [workHere, setWorkHere] = useState(true);
  const [fromDate, setFromDate] = useState({});
  const [toDate, setToDate] = useState({});

  const requiredFields = ["company"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requiredFields.every((field) => e.target.elements[field]?.value.length))
      console.log(true);
    else console.log(false);
  };

  const handleSetDate = (setDate, type, val) => {
    setDate((prevDate) => ({
      ...prevDate,
      [type.toLowerCase()]: val === type ? null : val,
      ...(val === type && type === "Year" ? { month: null } : {})
    }));
  };

  return (
    <form
      className="add_workplace"
      onSubmit={handleSubmit}
      onChange={(e) => {
        switch (e.target.id) {
          case "currentEmployment":
            setWorkHere(e.target.checked);
            break;
          case "startYear":
            handleSetDate(setFromDate, "Year", e.currentTarget?.elements?.startYear?.value);
            break;
          case "startMonth":
            handleSetDate(setFromDate, "Month", e.currentTarget?.elements?.startMonth?.value);
            break;
          case "startDay":
            handleSetDate(setFromDate, "Day", e.currentTarget?.elements?.startDay?.value);
            break;
          case "endYear":
            handleSetDate(setToDate, "Year", e.currentTarget?.elements?.endYear?.value);
            break;
          case "endMonth":
            handleSetDate(setToDate, "Month", e.currentTarget?.elements?.endMonth?.value);
            break;
          case "endDay":
            handleSetDate(setToDate, "Day", e.currentTarget?.elements?.endDay?.value);
            break;
          default:
            break;
        }
        if (disableSubmit) setDisableSubmit(false);
      }}
    >
      <TextBox label="company" name="Company" />
      <TextBox label="position" name="Position" />
      <TextBox label="cityTown" name="City/Town" />
      <TextBox label="description" name="Description" rows={3} />
      <div className="employment_length">
        <h4>Time Period</h4>
        <CheckBox
          label="currentEmployment"
          text="I currently work here"
          isChecked={true}
        />
        <div className="date_select">
          {workHere && <span className="date_select_from">From</span>}
          <div className="start_date">
            <SelectDropdown label="startYear" type="Year" startingYear={1985} />
            {fromDate.year && (
              <SelectDropdown
                label="startMonth"
                type="Month"
                startingMonth={0}
              />
            )}
            {fromDate.month && (
              <SelectDropdown
                label="startDay"
                type="Day"
                startingDate={1}
                selectedMonth={fromDate.month}
                selectedYear={fromDate.year}
              />
            )}
          </div>

          {!workHere && (
            <>
              <span className="date_select_to">to</span>
              <div className="end_date">
                <SelectDropdown
                  label="endYear"
                  type="Year"
                  startingYear={1985}
                />
                {toDate.year && (
                  <SelectDropdown
                    label="endMonth"
                    type="Month"
                    startingMonth={0}
                  />
                )}
                {toDate.month && (
                  <SelectDropdown
                    label="endDay"
                    type="Day"
                    startingDate={1}
                    selectedMonth={toDate.month}
                    selectedYear={toDate.year}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="profile_details_form_footer">
        <div>Public</div>
        <div>
          <input type="reset" value="Cancel" onClick={handleReset} />
          <input type="submit" value="Save" disabled={disableSubmit} />
        </div>
      </div>
    </form>
  );
}

export default WorkplaceForm;
