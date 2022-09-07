import React, { useEffect, useState, useRef } from "react";
import "./styles/feed.css";
// COMPONENTS
import StoryReel from "../../components/StoryReel/";
import MessageSender from "../../components/MessageSender/";
import VideoFeed from "../../components/VideoFeed";
import Post from "../../components/Post";
// State
import { useStateValue } from "../../providers/StateProvider";
import { useApiUtil } from "../../providers/ApiUtil";

function PostFeed({ page, user }) {
  const [initialRender, setInitialRender] = useState(true);
  const {
    state: {
      feed: { users, posts, comments },
    },
  } = useStateValue();
  const { getFeedData } = useApiUtil();
  const userRef = useRef(user);

  useEffect(() => {
    const numberOfFriends = 10;
    const getUserIds = (n) => {
      const shuffled = user.friends.sort(() => 0.5 - Math.random());
      return user.friends.length > n ? shuffled.slice(0, n) : shuffled;
    };

    const onScroll = async () => {
      // window.document.body.offsetHeight * .75 <= window.pageYOffset + window.innerHeight
      if (
        window.document.body.offsetHeight ===
          window.pageYOffset + window.innerHeight &&
        !initialRender
      ) {
        getFeedData(
          getUserIds(numberOfFriends),
          numberOfFriends,
          page === "userWall" ? ["wallId", "==", user.id] : null
        );
      }
    };

    if (initialRender || userRef.current !== user) {
      getFeedData(
        getUserIds(numberOfFriends),
        numberOfFriends,
        page === "userWall" ? ["wallId", "==", user.id] : null,
        true
      );
      setInitialRender(false);
      userRef.current = user;
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [initialRender, user.friends, posts, page, user.id, getFeedData, user]);

  return initialRender || userRef.current !== user ? (
    <></>
  ) : (
    <div className="feed">
      <div className="feed__container">
        {page === "userFeed" && <StoryReel />}
        <MessageSender wallId={user.id} />
        {page === "userFeed" && <VideoFeed />}
        {posts.map((post, idx) => {
          return (
            <Post
              idx={idx}
              users={users}
              key={post.id}
              post={post}
              comments={comments[post.id]}
            />
          );
        })}
        {page === "userFeed" && (
          <div className="feed__noMorePosts">
            <h3>No More Posts</h3>
            <p>Add more friends to see more posts in your News Feed</p>
            <button>Find Friends</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostFeed;
