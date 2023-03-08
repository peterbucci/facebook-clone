import React from "react";
// CSS
import "./styles/post_footer.css";
// ICONS
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

function Counters({ aggregateCount, reactions }) {
  return (
    <div className="post__counters">
      <div
        className={`post__reactions ${
          reactions.like.length > 0 ? "" : "transparent"
        }`}
      >
        <ThumbUpIcon style={{ fontSize: "small" }} className="likeIcon" />
        <p className="reactionCount">{reactions.like.length}</p>
      </div>
      {aggregateCount && (
        <div className="post__engagements">
          {aggregateCount}
          {aggregateCount === 1 ? " Comment" : " Comments"}
        </div>
      )}
    </div>
  );
}

export default Counters;
