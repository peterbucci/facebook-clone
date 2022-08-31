import React from 'react'
// COMPONENTS
import Sidebar from '../../fragments/Sidebar'
import Feed from './Feed'
import Widget from '../../fragments/Widget'

export default function UserFeed() {
  return <>
    <Sidebar />
    <Feed />
    <Widget />
  </>
}