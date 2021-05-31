import React from 'react'
import { Link } from "react-router-dom"
import './PostHeader.css'
// COMPONENTS
import NewAvatar from './Avatar'

function PostHeader({
  originalPoster,
  action,
  timestamp
}) {
  return <>
    <div className="post__header">
      <Link to={`/${originalPoster.url}`}>
        <NewAvatar pictureId={originalPoster.profilePic} className="post__avatar" />
      </Link>

      <div className="post__headerInfo">
        <h3 className="headerInfo__name">
          <Link to={`/${originalPoster.url}`}>
            {`${originalPoster.firstName} ${originalPoster.lastName}`}
          </Link> 
          
          {action && ' ' + action}
        </h3>
        {timestamp 
          && <p className="headerInfo__timestamp">{new Date(timestamp.toDate()).toUTCString()}</p>}
      </div>
    </div>
  </>
}

export default PostHeader
