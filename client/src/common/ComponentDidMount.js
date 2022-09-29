import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ComponentDidMount({scrollToX, scrollToY}) {
  const location = useLocation()

  useEffect(() => {
    if (scrollToX || scrollToY) window.scrollTo(scrollToX ?? 0, scrollToY ?? 0);
  }, [scrollToX, scrollToY]);

  useEffect(() => {
    if (window.history.state?.state) {
      window.history.replaceState(null, "");
    } else {
      const appRef = document.getElementsByClassName("app")[0]
      appRef.style.minHeight = 0
    }
  }, [location.pathname])

  return null
}

export default ComponentDidMount