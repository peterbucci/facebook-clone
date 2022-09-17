import React from "react";
// COMPONENTS
import Sidebar from "./sidebar";
import PostFeed from "../../components/PostFeed";
import Widget from "./widget";
// STATE
import { useStateValue } from "../../providers/StateProvider";

export default function UserFeed() {
  const { state } = useStateValue();
  const { user, users } = state
  const currentUser = users[user]

  return (
    <>
      <Sidebar />
      <PostFeed page="userFeed" user={currentUser} />
      <Widget />
    </>
  );
}
