import React, { useState, useEffect } from 'react'
import './index.css'

// COMPONENTS
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import VideoFeed from './VideoFeed'
import PostList from '../common/PostList'
// API
import { getSnapshot } from '../common/APIUtils'
// State
import { useStateValue } from '../StateProvider'

function Feed() {
  const [{ user }] = useStateValue()
  const [posts, setPosts] = useState([])
  const [usersWhoContributed, setUsersWhoContributed] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    getSnapshot({
      collection: 'wallPosts',
      filter: ['userId', '==', user.id],
      order: ['timestamp', 'desc'],
      setState: setPosts
    })
  }, [])

  useEffect(() => {
    const postId = posts.map(post => post.id)
    postId.length > 0 && getSnapshot({
      collection: 'comments',
      filter: ['postId', 'in', postId],
      order: ['timestamp', 'asc'],
      setState: setComments
    })
  }, [posts])

  useEffect(() => {
    const users = posts.reduce((users, post) => {
      return [...users, post.userId, ...post.reactions.like, ...comments.map(comment => comment.userId)]
    }, [])
      .filter((userId, index, self) => self.indexOf(userId) === index)
    
    if (users.length > 0) {
      const reduceUsers = snapshot => snapshot.docs.reduce((users, user) => {
        return {
          ...users,
          [user.data().id]: user.data()
        }
      }, {})

      getSnapshot({
        collection: 'users',
        filter: ['id', 'in', users],
        setState: setUsersWhoContributed,
        modifyData: reduceUsers
      })
    }
  }, [comments, posts])

  return (
    <div className="feed">
      <div className="feed__container">
        <StoryReel />
        <MessageSender />
        <VideoFeed />
        <PostList 
          posts={posts}
          comments={comments}
          usersWhoContributed={usersWhoContributed}
        />
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
