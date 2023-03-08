import React from "react";
import "./styles/user_feed.css";
// COMPONENTS
import Sidebar from "./sidebar";
import PostFeed from "../../components/PostFeed";
import Widget from "./widget";
// STATE
import { useStateValue } from "../../providers/StateProvider";

export default function UserFeed() {
  const { state } = useStateValue();
  const { user, users, posts, postOrder, comments, commentOrder, wallId } = state;
  const currentUser = users[user];
  const currentUserPic = posts[currentUser.profilePic];

  return (
    <div className="user__home">
      <Sidebar currentUser={currentUser} currentUserPic={currentUserPic} />
      <PostFeed 
        page="userFeed" 
        currentUser={currentUser}
        currentUserPic={currentUserPic}
        users={users} 
        posts={posts}
        postOrder={postOrder}
        comments={comments}
        commentOrder={commentOrder}
        wallId={wallId}
        feedClass="user__feed"
        feedBodyClass="user__feed_body"
      />
      <Widget />
    </div>
  );
}
