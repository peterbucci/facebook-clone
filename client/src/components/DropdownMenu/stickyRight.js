function stickyRight(right, buttonRef, textWidth) {
  const distanceFromRight = window.innerWidth * right;
  const menuRight = -(
    window.innerWidth -
    distanceFromRight -
    buttonRef.current?.getBoundingClientRect().right
  );

  const screenTooNarrow =
    buttonRef.current?.getBoundingClientRect().left + textWidth >=
    window.innerWidth;

  return screenTooNarrow ? { right: menuRight } : null;
}

export default stickyRight