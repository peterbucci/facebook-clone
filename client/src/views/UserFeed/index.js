import React from "react";
// COMPONENTS
import Sidebar from "./sidebar";
import PostFeed from "../../components/PostFeed";
import Widget from "./widget";
// STATE
import { useStateValue } from "../../providers/StateProvider";

export default function UserFeed() {
  const { state } = useStateValue();

  return (
    <>
      <Sidebar />
      <PostFeed page="userFeed" user={state.user} />
      <Widget />
    </>
  );
}
