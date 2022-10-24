import React, { useRef, useEffect, useState } from "react";
import Bio from "./Bio";

function BodySidebar({ userId, currentProfile }) {
  const windowSize = window.innerWidth
  const [activeEventListener, setActiveEventListener] = useState(windowSize > 775)
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const scrollNameRef = useRef(null);
  const prevScrollMainRef = useRef(null);
  const prevScrollSidebarRef = useRef(null);

  useEffect(() => {
    if (windowSize < 900) setActiveEventListener(false)
    else setActiveEventListener(true)
  }, [windowSize])

  useEffect(() => {
    const stickyContainer = stickyRef.current;
    const onScroll = (
      name,
      scrollingContainer,
      scrollbarY,
      prevScrollRef,
      scrollKey,
      earlyReturn
    ) => {
      const prevScroll = prevScrollRef.current;
      scrollNameRef.current = name;
      if (!earlyReturn && (!prevScroll || prevScroll < scrollbarY)) {
        scrollingContainer.scrollTo(
          0,
          scrollingContainer[scrollKey] + (scrollbarY - prevScroll)
        );
      } else if (prevScroll > scrollbarY) {
        scrollingContainer.scrollTo(
          0,
          scrollingContainer[scrollKey] - (prevScroll - scrollbarY)
        );
      }

      prevScrollRef.current = scrollbarY;
    };

    const onMainScroll = () => {
      if (scrollNameRef.current === "Sidebar") scrollNameRef.current = null;
      else {
        onScroll(
          "Main",
          stickyRef.current,
          window.scrollY,
          prevScrollMainRef,
          "scrollTop",
          stickyRef.current?.getBoundingClientRect().top !== 115
        );
      }
    };

    const onSidebarScroll = (e) => {
      if (scrollNameRef.current === "Main") scrollNameRef.current = null;
      else {
        onScroll(
          "Sidebar",
          window,
          e.target.scrollTop,
          prevScrollSidebarRef,
          "scrollY"
        );
      }
    };

    activeEventListener && stickyContainer.addEventListener("scroll", onSidebarScroll);
    activeEventListener && window.addEventListener("scroll", onMainScroll);
    return () => {
      stickyContainer.removeEventListener("scroll", onSidebarScroll);
      window.removeEventListener("scroll", onMainScroll);
    };
  }, [activeEventListener]);

  return (
    <div className="profile_body_left_col" ref={containerRef}>
      <div
        className="left_col_sidebar"
        style={{
          height: activeEventListener ? window.innerHeight - 115 : "auto",
        }}
        ref={stickyRef}
      >
        <div>
          <div className="left_col_sidebar_container">
            <h3>Intro</h3>
            <Bio userBio={currentProfile.bio} userId={currentProfile.id} currentUser={userId} />
            {currentProfile.id === userId && <>
              <span className="sidebar_container_button">Edit Details</span>
              <span className="sidebar_container_button">Add Hobbies</span>
              <span className="sidebar_container_button">Add Featured</span>
            </>}
          </div>

          <div className="left_col_sidebar_container">
            <div className="sidebar_container_header">
              <h3>Photos</h3>
              <span>See all photos</span>
            </div>
          </div>

          <div className="left_col_sidebar_container">
            <div className="sidebar_container_header">
              <h3>Friends</h3>
              <span>See all friends</span>
            </div>
          </div>
        </div>

        <div className="left_col_sidebar_footer">
          Privacy · Terms · Advertising · Ad Choices · Cookies · More · Meta ©
          2022
        </div>
      </div>
    </div>
  );
}

export default BodySidebar;
