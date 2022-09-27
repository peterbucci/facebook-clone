import React from "react";
import "./styles/profile_posts.css";
// COMPONENTS
import PostFeed from "components/PostFeed";
// STATE
import { useStateValue } from "providers/StateProvider";
import BodySidebar from "./BodySidebar";

function ProfilePosts({ currentProfile, currentProfilePic }) {
  const {
    state: { user, users, posts, postOrder, comments, commentOrder, wallId },
  } = useStateValue();

  return (
    <div className="profile_body profile_wrapper">
      <BodySidebar userId={user} currentProfile={currentProfile} />
      <div className="profile_body_right_col">
        <PostFeed
          page="userWall"
          currentUser={currentProfile}
          currentUserPic={currentProfilePic}
          users={users}
          posts={posts}
          postOrder={postOrder}
          comments={comments}
          commentOrder={commentOrder}
          wallId={wallId}
          feedClass="no_padding"
        />
      </div>
    </div>
  );
}

export default ProfilePosts;
