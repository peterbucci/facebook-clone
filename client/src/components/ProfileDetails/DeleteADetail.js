import BackgroundIcon from "common/icons/BackgroundIcon";
import ModalBox from "components/ModalBox";
import { useApiUtil } from "providers/ApiUtil";

function DeleteADetail({
  detailId,
  detailName,
  userId,
  closeModal,
  idx,
  type,
}) {
  const { deleteProfileDetail } = useApiUtil();
  const handleDelete = () => {
    deleteProfileDetail(detailId, userId, idx, type)
    closeModal()
  }

  return (
    <ModalBox handleClickAway={closeModal}>
      <div className="profile_detail_delete">
        <div className="close_button" onClick={closeModal}>
          <BackgroundIcon icon="close" />
        </div>
        <div className="profile_detail_delete_header">Are you sure?</div>
        <div className="profile_detail_delete_body">
          Are you sure you want to remove this {detailName} from your profile?
        </div>
        <div className="profile_detail_delete_footer">
          <span className="profile_detail_delete_cancel" onClick={closeModal}>
            Cancel
          </span>
          <span
            className="profile_detail_delete_confirm"
            onClick={handleDelete}
          >
            Confirm
          </span>
        </div>
      </div>
    </ModalBox>
  );
}

export default DeleteADetail;
