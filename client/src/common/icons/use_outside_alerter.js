import { useEffect } from "react";

function useOutsideAlerter(ref, closeAllMenus) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current === event.target) {
        closeAllMenus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeAllMenus]);
}

export default useOutsideAlerter