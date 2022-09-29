import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./styles/header_left.css"
// ICONS
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./styles/header.css";
import Logo from "common/icons/Logo";


function HeaderLeft() {
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation()

  const searchInputContainer = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const currentSearchInputRef = searchInputRef.current;
    const currSearchInputContainerRef = searchInputContainer.current;
    if (currentSearchInputRef) {
      currentSearchInputRef.addEventListener("focus", handleFocus);
      currSearchInputContainerRef.addEventListener("click", handleClick);
      currentSearchInputRef.addEventListener("focusout", handleBlur);

      return () => {
        currentSearchInputRef.removeEventListener("focus", handleFocus);
        currSearchInputContainerRef.removeEventListener("click", handleClick);
        currentSearchInputRef.removeEventListener("focusout", handleBlur);
      };
    }
  });

  const handleFocus = () => {
    setSearchFocused(true);
  };

  const handleClick = () => {
    setSearchClicked(true);
  };

  const handleBlur = () => {
    setSearchFocused(false);
    setSearchClicked(false);
  };

  return (
        <div
        className="header__left"
        style={{ left: location.pathname.startsWith("/photo") ? "0" : "-50px" }}
      >
        <div
          className={`header__left_search${
            searchClicked ? " search-clicked" : " search-not-clicked"
          }`}
        >
          {location.pathname.startsWith("/photo") && (
            <div className="viewPicture__close-icon" id="photo_close_icon">
              <CloseIcon />
            </div>
          )}

          <Logo searchClicked={searchClicked} className="header__left" />
          <ArrowBackIcon
            className={`header__left__arrow-back-icon ${
              searchClicked ? " clicked" : " not-clicked"
            }`}
            onClick={() => setSearchClicked(false)}
          />
          {!location.pathname.startsWith("/photo") && (
            <div
              className={`header__left__absolute-container${
                searchClicked ? " clicked" : " notlicked"
              }`}
            >
              <label
                htmlFor="search-input"
                ref={searchInputContainer}
                className={`header__left__input${
                  searchClicked ? " clicked" : " notlicked"
                }`}
              >
                <SearchIcon
                  className={searchFocused ? "focused" : "notFocused"}
                />
                <input
                  ref={searchInputRef}
                  className={searchFocused ? "focused" : "notFocused"}
                  placeholder="Search Facebook"
                  type="text"
                  id="search-input"
                />
              </label>
              <div
                className={`header__left__search-history${
                  searchClicked ? " search-clicked" : " search-not-clicked"
                }`}
              >
                {searchClicked && <p>No recent searches</p>}
              </div>
            </div>
          )}
        </div>
      </div>
  )
}

export default HeaderLeft