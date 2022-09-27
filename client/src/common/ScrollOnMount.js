import { useEffect } from "react";

function ScrollOnMount({x, y}) {
  useEffect(() => {
    window.scrollTo(x, y);
  }, [x, y]);

  return null;
}

export default ScrollOnMount