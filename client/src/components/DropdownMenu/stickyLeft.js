function stickyLeft(menuRef, buttonRef) {
  const menu = menuRef.current;
  const button = buttonRef.current;
  const leftSticky = (menu?.offsetWidth - button?.offsetWidth) / 2;
  const buttonLeft = button?.getBoundingClientRect().left;

  return window.innerWidth < 900 || buttonLeft > leftSticky
    ? null
    : {
        left: -buttonLeft + 10,
        right: "auto",
        transform: "none",
      };
}

export default stickyLeft