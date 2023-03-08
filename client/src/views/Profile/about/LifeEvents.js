import { useState } from "react";
import ModalBox from "components/ModalBox";
import ProfileDetails from "components/ProfileDetails";
import NoDetailToShow from "components/ProfileDetails/NoDetailToShow";
import BackgroundIcon from "common/icons/BackgroundIcon";

const icons = [
  { text: "Work", icon: "suitcase" },
  { text: "Education", icon: "graduationCapLifeEvents" },
  { text: "Relationship", icon: "heartsLifeEvents" },
  { text: "Home & Living", icon: "houseLifeEvents" },
  { text: "Family", icon: "familyTreeLifeEvents" },
  { text: "Travel", icon: "globeLifeEvents" },
  { text: "Interests & Activities", icon: "starLifeEvents" },
  { text: "Health & Wellness", icon: "clipBoardHeart" },
  { text: "Milestones & Achievements", icon: "starTrophy" },
  { text: "Remembrance", icon: "cake" },
  { text: "Create Your Own", icon: "flag" },
];

function LifeEventsModal({ closeModal }) {
  return (
    <div className="life_events_modal">
      <div className="close_button" onClick={closeModal}>
        <BackgroundIcon icon="close" />
      </div>
      <img src={`/banners/st43MlfQdGP.png`} alt="" />
      <h3>Life events</h3>
      <span>Share and remember important moments from your life.</span>
      <div className="horizontal_divider"></div>
      <h4>SELECT A CATEGORY</h4>
      <div className="icon_menu">
        {icons.map(({ icon, text }, i) => {
          return (
            <div className="icon_menu_item">
              <BackgroundIcon icon={icon} />
              <span>{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LifeEvents({ currentProfile, user }) {
  const [modalActive, setModalActive] = useState(false);
  const isProfileUser = currentProfile.id === user;

  return (
    <ul>
      <h3>Life events</h3>
      <ProfileDetails
        isProfileUser={isProfileUser}
        detail="lifeEvents"
        disableDefault={true}
        handleOnClick={() => setModalActive(true)}
      />
      {modalActive && (
        <ModalBox handleClickAway={() => setModalActive(false)}>
          <LifeEventsModal closeModal={() => setModalActive(false)} />
        </ModalBox>
      )}
      <NoDetailToShow detail="lifeEvents" />
    </ul>
  );
}

export default LifeEvents;
