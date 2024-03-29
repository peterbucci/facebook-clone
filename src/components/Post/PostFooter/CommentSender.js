import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
// CSS
import "./styles/post_footer.css";
// COMPONENTS
import NewAvatar from "components/Avatar/";
// Database
import { useApiUtil } from "providers/ApiUtil";

function CommentSender({
  currentUserPic,
  post,
  user,
  aggregateCount,
  avatarClass,
  parentComment = false
}) {
  const { addNewComment } = useApiUtil();
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addNewComment(
      post.userId,
      user.id,
      post.id,
      comment,
      firebase.firestore.FieldValue.serverTimestamp(),
      aggregateCount,
      parentComment
    );
    setComment("");
  };

  return (
      <div className="post__commentSender">
        <NewAvatar
          profilePicData={currentUserPic} 
          className={`${avatarClass} commentSender__avatar`}
        />
        <form>
          <input
            className="commentSender__input"
            placeholder="Write a comment..."
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button onClick={handleCommentSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>
  );
}

export default CommentSender;