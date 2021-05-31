import React from 'react'
import './index.css'
// COMPONENTS
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import VideoFeed from './VideoFeed'
import PostList from '../common/PostList'
// State
import { useStateValue } from '../StateProvider'

function Feed() {
  const [{ user }] = useStateValue()

  return (
    <div className="feed">
      <div className="feed__container">
        <StoryReel />
        <MessageSender />
        <VideoFeed />
        <PostList postFilter={['userId', 'in', user.friends]} />
        <div className="feed__noMorePosts">
          <h3>No More Posts</h3>
          <p>Add more friends to see more posts in your News Feed</p>
          <button>Find Friends</button>
        </div>
      </div>
    </div>
  )
}

export default Feed
