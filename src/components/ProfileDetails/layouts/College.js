import { useState } from "react";
import { Link } from "react-router-dom";
import { college as CollegeForm } from "../forms";
import BackgroundIcon from "common/icons/BackgroundIcon";
import DropdownMenu from "components/DropdownMenu";
import PrivacySetting from "components/PrivacySetting";
import DeleteADetail from "../DeleteADetail";

const formatHeaderText = (detail, study) => {
  return (
    <h5>
      {detail.concentrationOne && (
        <span>{`${study} ${detail.concentrationOne} at `}</span>
      )}
      <Link to="photos">{detail.school}</Link>
    </h5>
  );
};

const formatFirstParagraph = (detail, study) => {
  const startDate = formatDate(
    detail.startYear,
    detail.startMonth,
    detail.startDay
  );
  const endDate = formatDate(detail.endYear, detail.endMonth, detail.endDay);
  const divider = " · ";
  const degree = detail.degree ? detail.degree : "";
  const additionalConcentrations = [
    detail.concentrationTwo,
    detail.concentrationThree,
  ].reduce((string, currentFragment) => {
    const concentration = currentFragment ? currentFragment : "";
    const and = concentration && string.length ? " and " : "";
    return string + and + concentration;
  }, "");
  return (
    <p>
      {degree +
        (degree.length && additionalConcentrations.length ? divider : "") +
        (additionalConcentrations.length ? `Also ${study} ` : "") +
        additionalConcentrations +
        (additionalConcentrations.length &&
        ((endDate && detail.graduated) || (endDate && startDate))
          ? divider
          : "") +
        (endDate
          ? detail.graduated
            ? "Class of " + detail.endYear
            : startDate
            ? startDate + " - " + endDate
            : ""
          : "")}
    </p>
  );
};

const formatDate = (year, month, day) => {
  return year
    ? (month ? month + " " : "") + (day ? day + ", " : "") + year
    : "";
};

function College({ detail, user, idx, isProfileUser }) {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const study = detail.graduated ? "Studied" : "Studies";

  return edit ? (
    <CollegeForm
      handleReset={() => setEdit(false)}
      user={user}
      currentFormData={detail}
      idx={idx}
    />
  ) : (
    <div className="profile_detail_list">
      <div className="profile_detail_list_item">
        <BackgroundIcon icon="graduate" />
        <div className="profile_detail_list_item_text">
          {formatHeaderText(detail, study)}
          {formatFirstParagraph(detail, study)}
          {detail.description && (
            <p className="profile_detail_description">{detail.description}</p>
          )}
        </div>
        {isProfileUser && (
          <>
            <PrivacySetting
              selected="public"
              iconOnly={true}
              filter="invert(39%) sepia(21%) saturate(200%) saturate(109.5%) hue-rotate(174deg) brightness(94%) contrast(86%)"
            />
            <DropdownMenu
              buttonIcon="ellipsis20"
              align="right"
              width={344}
              listItems={{
                "See life events": {
                  onClick: () => console.log(true),
                  Icon: () => <BackgroundIcon icon="star22" />,
                },
                "Edit School": {
                  onClick: () => setEdit(true),
                  Icon: () => <BackgroundIcon icon="pencil" />,
                },
                "Delete School": {
                  onClick: () => setDel(true),
                  Icon: () => <BackgroundIcon icon="trashcan" />,
                },
              }}
              listOrder={["See life events", "Edit School", "Delete School"]}
            />
          </>
        )}
        {del && (
          <DeleteADetail
            detailId={detail.id}
            detailName="school"
            userId={user}
            closeModal={() => setDel(false)}
            idx={idx}
            type={detail.type}
          />
        )}
      </div>
    </div>
  );
}

export default College;
