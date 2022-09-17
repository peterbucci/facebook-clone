import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
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
  const feedRef = useRef(null)
  const {
    state: {
      users, posts, wallId, postOrder
    },
  } = useStateValue();
  const { getFeedData } = useApiUtil();
  const changingWall = wallId !== (page === "userWall" ? user.id : page);
  const history = useHistory();
  const scrollToY = history.location.state?.scrollToY
  const height = history.location.state?.height
  
  const wallPosts = postOrder.map(id => posts[id])

  useEffect(() => {
    if (scrollToY) {
      window.scrollTo(0, scrollToY)
      window.history.replaceState(null, "");
    }
}, [scrollToY])

  useEffect(() => {
    const setFeedData = (initialRender, numberOfFriends = 10) => {
      const getUserIds = (n) => {
        const shuffled = user.friends.sort(() => 0.5 - Math.random());
        return user.friends.length > n ? shuffled.slice(0, n) : shuffled;
      };

      getFeedData(
        wallPosts,
        getUserIds(numberOfFriends),
        numberOfFriends,
        page === "userWall" ? ["wallId", "==", user.id] : null,
        initialRender,
        page === "userWall" ? user.id : page
      );
    };

    const onScroll = () => {
      // window.document.body.offsetHeight * .75 <= window.pageYOffset + window.innerHeight
      if (
        window.document.body.offsetHeight ===
        window.pageYOffset + window.innerHeight
      ) {
        if (!changingWall) setFeedData(false);
      }
    };

    if (changingWall) setFeedData(true);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [user.friends, page, user.id, getFeedData, user, wallPosts, changingWall]);

  return (
    <div className="feed" style={{ height: height ?? "auto"}} >
      <div className="feed__container" ref={feedRef}>
        {page === "userFeed" && <StoryReel />}
        <MessageSender wallId={user.id} />
        {page === "userFeed" && <VideoFeed />}
        {changingWall ? (
          <></>
        ) : (
          wallPosts.map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
                userOfPost={users[post.userId]}
                wallOfPost={users[post.wallId]}
                profilePicData={posts[users[post.userId].profilePic]}
                feedRef={feedRef}
                page={page}
              />
            );
          })
        )}
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
