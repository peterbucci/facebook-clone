import React from "react";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./styles/post_header.css";
// COMPONENTS
import NewAvatar from "components/Avatar/";
import { formatTimeStamp } from "common/format_timestamp";

const actions = {
  "Profile Picture": "updated their profile picture.",
};

function PostHeader({
  profilePicData,
  originalPoster,
  currentWall,
  postType,
  timestamp,
}) {
  const action = actions[postType];
  return (
    <div className="post__header">
      <Link
        to={{
          pathname: `/${originalPoster.url}`,
          state: { uid: originalPoster.id },
        }}
      >
        <NewAvatar profilePicData={profilePicData} className="post__avatar" />
      </Link>

      <div className="post__headerInfo">
        <h3 className="headerInfo__name">
          <Link
            to={{
              pathname: `/${originalPoster.url}`,
              state: { uid: originalPoster.id },
            }}
          >
            {`${originalPoster.firstName} ${originalPoster.lastName}`}
          </Link>
          {currentWall.id !== originalPoster.id && (
            <>
              <ArrowRightIcon />
              <Link
                to={{
                  pathname: `/${currentWall.url}`,
                  state: { uid: currentWall.id },
                }}
              >
                {`${currentWall.firstName} ${currentWall.lastName}`}
              </Link>
            </>
          )}
          {action && (
            <span className="headerInfo__action">
              <span>&nbsp;</span>
              {action}
            </span>
          )}
        </h3>
        <p className="headerInfo__timestamp">
          {formatTimeStamp(timestamp.seconds, "post")}
        </p>
      </div>
    </div>
  );
}

export default PostHeader;
