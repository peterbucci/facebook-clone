import stickyRight from "./stickyRight";
import stickyLeft from "./stickyLeft";

function determinePos(align, right, left, buttonRef, menuRef, textWidth) {
  const alignMenu =
    align === "right"
      ? { right: 0 }
      : align === "center"
      ? {
          right: "50%",
          transform: "translate(50%, 0)",
        }
      : { left: 0 };

  const stickyMenu = right
    ? stickyRight(right, buttonRef, textWidth)
    : left
    ? stickyLeft(menuRef, buttonRef)
    : null;

  return stickyMenu ?? alignMenu;
}

export default determinePos;
