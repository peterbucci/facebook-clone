import { useState, useEffect, useRef } from "react";
import PrivacySetting from "components/PrivacySetting";

function FormFooter({ handleReset, disableSubmit, noPrivacy }) {
  const [cancelStyle, setCancelStyle] = useState(null);
  const [submitStyle, setSubmitStyle] = useState(null);

  const cancelRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    const cancelButton = cancelRef.current;
    const submitButton = submitRef.current;
    if (!cancelStyle)
      setCancelStyle({
        height: cancelButton.offsetHeight,
        width: cancelButton.offsetWidth,
      });
    if (!submitStyle)
      setSubmitStyle({
        height: submitButton.offsetHeight,
        width: submitButton.offsetWidth,
      });
  }, [cancelStyle, submitStyle]);

  return (
    <div className="profile_details_form_footer">
      <div>{!noPrivacy && <PrivacySetting selected="public" />}</div>
      <div className="left_form_footer">
        <div className="reset_button button" style={cancelStyle}>
          <input
            type="reset"
            value="Cancel"
            onClick={handleReset}
            ref={cancelRef}
          />
        </div>
        <div className="button" style={submitStyle}>
          <input
            type="submit"
            value="Save"
            disabled={disableSubmit}
            ref={submitRef}
          />
        </div>
      </div>
    </div>
  );
}

export default FormFooter;
