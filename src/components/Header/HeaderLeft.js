import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/header_left.css";
// ICONS
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./styles/header.css";
import Logo from "common/icons/Logo";

function HeaderLeft() {
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();

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

  const headerLeftClasses = `header__left${
    location.pathname.startsWith("/photo")
      ? " show-close-icon"
      : " hide-close-icon"
  }`;

  const arrowBackClasses = `header__left__arrow-back-icon${
    searchClicked ? " clicked" : " not-clicked"
  }`;

  const headerSearchContainerClasses = `header__search_container${
    searchClicked ? " clicked" : " notlicked"
  }`;

  const headerSearchLabelClasses = `header__left__input${
    searchClicked ? " clicked" : " notlicked"
  }`;

  const headerSearchHistoryClasses = `header__left__search-history${
    searchClicked ? " search-clicked" : " search-not-clicked"
  }`;

  return (
    <div className={headerLeftClasses}>
      {location.pathname.startsWith("/photo") && (
        <div className="header__left_close-icon" id="photo_close_icon">
          <CloseIcon />
        </div>
      )}
      <Logo searchClicked={searchClicked} className="header__left" />
      <ArrowBackIcon
        className={arrowBackClasses}
        onClick={() => setSearchClicked(false)}
      />
      {!location.pathname.startsWith("/photo") && (
        <div className={headerSearchContainerClasses}>
          <label
            htmlFor="search-input"
            className={headerSearchLabelClasses}
            onClick={handleClick}
          >
            <SearchIcon className={searchFocused ? "focused" : "notFocused"} />
            <input
              type="text"
              id="search-input"
              className={searchFocused ? "focused" : "notFocused"}
              placeholder="Search Facebook"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <div className={headerSearchHistoryClasses}>
            {searchClicked && <p>No recent searches</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderLeft;
