import React from 'react'
// COMPONENTS
import Sidebar from '../../fragments/Sidebar'
import Feed from './Feed'
import Widget from '../../fragments/Widget'
// STATE
import { useStateValue, useApiUtil } from "../../providers/StateProvider";

export default function UserFeed() {
  const {
    state: {
      user
    },
  } = useStateValue();
  return <>
    <Sidebar />
    <Feed page='userFeed' user={user} />
    <Widget />
  </>
}