import React from "react";
// CSS
import "./styles/post_footer.css";
// ICONS
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ReplyIcon from "@material-ui/icons/Reply";
// Database
import { useApiUtil } from "providers/ApiUtil";

function Options({
  post,
  userId,
  iconActive,
}) {
  const { handleReactionClick } = useApiUtil();
  const { reactions } = post;

  return (
      <div className="post__options">
        <button
          className="post__option"
          onClick={() =>
            handleReactionClick(reactions, "like", userId, post, "posts")
          }
        >
          <ThumbUpIcon className={iconActive} />
          <p className={iconActive}>Like</p>
        </button>
        <div className="post__option">
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <ReplyIcon className="shareIcon" />
          <p>Share</p>
        </div>
      </div>
  );
}

export default Options;
