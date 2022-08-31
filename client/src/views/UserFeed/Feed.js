import React, { useEffect, useState, useLayoutEffect } from "react";
import "./styles/feed.css";
// COMPONENTS
import StoryReel from "../../components/StoryReel/";
import MessageSender from "../../components/MessageSender/";
import VideoFeed from "../../components/VideoFeed";
import Post from "../../components/Post";
// State
import { useStateValue, useApiUtil } from "../../providers/StateProvider";

function Feed() {
  const {
    state,
    state: { user, posts, postOrder },
  } = useStateValue();
  const {    
    getPostData,
    getNewPostSnapshot,
    clearPostData
  } = useApiUtil()
  const [initialRender, setInitialRender] = useState(true)

  useEffect(() => {
    if (initialRender) getNewPostSnapshot(['friends', 'array-contains', user.id], state)
  }, [getNewPostSnapshot, user.id, initialRender, state])

  useEffect(() => {
    const numberOfFriends = 10
    const getUserIds = (n) => {
      const shuffled = user.friends.sort(() => 0.5 - Math.random());
      return user.friends.length > n ? shuffled.slice(0, n) : shuffled
    }

    const onScroll = async () => {
      // window.document.body.offsetHeight * .75 <= window.pageYOffset + window.innerHeight
      if (window.document.body.offsetHeight === window.pageYOffset + window.innerHeight) {
        getPostData(getUserIds(numberOfFriends), numberOfFriends)
      }
    };

    if (initialRender) {
      getPostData(getUserIds(numberOfFriends), numberOfFriends)
      setInitialRender(false)
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [getPostData, initialRender, user.friends]);

  return ( 
    posts 
    ? (
      <div className="feed">
        <div className="feed__container">
          <StoryReel />
          <MessageSender />
          <VideoFeed />
          {postOrder.map((id, i) => {
            const post = posts[id]
            return post
              ? <Post
                  key={post.id}
                  post={post}
                  action={
                    post.type === "Profile Picture"
                      ? "updated their profile picture."
                      : ""
                  }
                />
              : <div key={i}></div>
          })}
          <div className="feed__noMorePosts">
            <h3>No More Posts</h3>
            <p>Add more friends to see more posts in your News Feed</p>
            <button>Find Friends</button>
          </div>
        </div>
      </div>
    )
    : <></>
  );
}

export default Feed;