import React from 'react'
import VideoCallIcon from '@material-ui/icons/VideoCall';
import './styles/video_feed.css'

function VideoFeed() {
  return (
    <div className="videoFeed">
      <button><VideoCallIcon /> <span>Create Room</span></button>
    </div>
  )
}

export default VideoFeed
