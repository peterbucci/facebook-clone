import useOutsideAlerter from "common/use_outside_alerter";
import { useRef, useEffect } from "react";
import "./styles/modal_box.css";

function ModalBox({ children, handleClickAway }) {
  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, handleClickAway);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="modal" ref={modalRef}>
      {children}
    </div>
  );
}

export default ModalBox;
