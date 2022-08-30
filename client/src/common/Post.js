import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
// CSS
import "./Post.css";
// COMPONENTS
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
// FIREBASE
import db from "../firebase";
// STATE
import { useStateValue } from "../providers/StateProvider";

function Post({ post, action }) {
  const { state: {user, users} } = useStateValue()
  const { id, image, message, reactions, timestamp, userId, wallId, type, thumbnail } =
    post;
  const originalPoster = users[userId];
  const currentWall = users[wallId]
  const [comment, setComment] = useState("");

  const postRef = db
    .collection("users")
    .doc(userId)
    .collection("posts")
    .doc(id);

  const handleReactionClick = (type) => {
    const newReactionsObj =
      reactions[type].indexOf(user.id) >= 0
        ? {
            ...reactions,
            [type]: reactions[type].filter((reaction) => reaction !== user.id),
          }
        : {
            ...reactions,
            [type]: [...reactions[type], user.id],
          };

    postRef.set({
      ...post,
      reactions: newReactionsObj,
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const newCommentRef = postRef.collection("comments").doc();
    newCommentRef.set({
      id: newCommentRef.id,
      image: "",
      message: comment,
      postId: post.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: user.id,
    });

    setComment("");
  };

  const iconActive = reactions.like.indexOf(user.id) >= 0 ? "blue" : "";

  return (
    <div className="post" key={post.id}>
      <PostHeader
        originalPoster={originalPoster}
        action={action}
        timestamp={timestamp}
        wallId={wallId}
        currentWall={currentWall}
      />

      <div
        className={`post__body${
          type === "Profile Picture" || message.length >= 85
            ? " small-font"
            : ""
        }`}
      >
        <p>{message}</p>
      </div>

      {image && (
        <div className="post__image">
          {type === "Wall Post" && <img src={image} alt="" />}
          {type === "Profile Picture" && (
            <img src={`http://localhost:3001/images/${thumbnail}`} alt="" />
          )}
        </div>
      )}

      <PostFooter
        post={post}
        postRef={postRef}
        user={user}
        iconActive={iconActive}
        usersInPost={users}
        handleCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
}

export default Post;
