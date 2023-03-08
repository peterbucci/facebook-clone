import { useState } from "react";
import { workplace as WorkplaceForm } from "../forms";
import BackgroundIcon from "common/icons/BackgroundIcon";
import DropdownMenu from "components/DropdownMenu";
import PrivacySetting from "components/PrivacySetting";
import { Link } from "react-router-dom";
import DeleteADetail from "../DeleteADetail";

const formatHeaderText = (detail) => {
  const position = detail.position
    ? detail.position + " at "
    : detail.currentEmployment
    ? "Works at "
    : "Worked at ";
  return (
    <h5>
      <span>{position}</span> <Link to="photos">{detail.company}</Link>
    </h5>
  );
};

const formatDate = (year, month, day) => {
  return year
    ? (month ? month + " " : "") + (day ? day + ", " : "") + year
    : "";
};

function Workplace({ detail, user, idx, isProfileUser }) {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const positionAndCompany = formatHeaderText(detail);
  const startDate = formatDate(
    detail.startYear,
    detail.startMonth,
    detail.startDay
  );
  const endDate = formatDate(detail.endYear, detail.endMonth, detail.endDay);

  return edit ? (
    <WorkplaceForm
      handleReset={() => setEdit(false)}
      user={user}
      currentFormData={detail}
      idx={idx}
    />
  ) : (
    <div className="profile_detail_list">
      <div className="profile_detail_list_item">
        <BackgroundIcon icon="whiteFlag" />
        <div className="profile_detail_list_item_text">
          {positionAndCompany}
          <p>
            {(detail.currentEmployment ? "From " : "") +
              startDate +
              (endDate ? " - " + endDate : "") +
              (detail.cityTown ? " · " + detail.cityTown : "")}
          </p>
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
                "Edit Workplace": {
                  onClick: () => setEdit(true),
                  Icon: () => <BackgroundIcon icon="pencil" />,
                },
                "Delete Workplace": {
                  onClick: () => setDel(true),
                  Icon: () => <BackgroundIcon icon="trashcan" />,
                },
              }}
              listOrder={[
                "See life events",
                "Edit Workplace",
                "Delete Workplace",
              ]}
            />
          </>
        )}
        {del && (
          <DeleteADetail
            detailId={detail.id}
            detailName="workplace"
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

export default Workplace;
