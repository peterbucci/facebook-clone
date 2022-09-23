import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./styles/feed.css";
// COMPONENTS
import StoryReel from "../../components/StoryReel/";
import MessageSender from "../../components/MessageSender/";
import VideoFeed from "../../components/VideoFeed";
import Post from "../../components/Post";
// State
import { useApiUtil } from "../../providers/ApiUtil";

function PostFeed({
  page,
  currentUser,
  currentUserPic,
  users,
  posts,
  postOrder,
  comments,
  commentOrder,
  wallId,
  containerClass,
}) {
  const feedRef = useRef(null);
  const gettingDataRef = useRef(false)
  const { getFeedData } = useApiUtil();
  const changingWall = wallId !== (page === "userWall" ? currentUser.id : page);
  const history = useHistory();
  const scrollToY = history.location.state?.scrollToY;
  const height = history.location.state?.height;

  const wallPosts = postOrder.map((id) => posts[id]);

  useEffect(() => {
    if (scrollToY) {
      window.scrollTo(0, scrollToY);
      window.history.replaceState(null, "");
    }
  }, [scrollToY]);

  useEffect(() => {
    const setFeedData = (initialRender, numberOfFriends = 10) => {
      const getUserIds = (n) => {
        const shuffled = currentUser.friends.sort(() => 0.5 - Math.random());
        return currentUser.friends.length > n ? shuffled.slice(0, n) : shuffled;
      };

      getFeedData(
        wallPosts,
        getUserIds(numberOfFriends),
        numberOfFriends,
        page === "userWall" ? ["wallId", "==", currentUser.id] : null,
        initialRender,
        page === "userWall" ? currentUser.id : page,
      )
    };

    const onScroll = () => {
      if (
        window.document.body.offsetHeight * 0.75 <=
        window.pageYOffset + window.innerHeight
      ) {
        if (!changingWall && !gettingDataRef.current) {
          gettingDataRef.current = true
          setFeedData(false);
        }
      }
    };

    if (changingWall) setFeedData(true);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [
    currentUser.friends,
    page,
    currentUser.id,
    getFeedData,
    currentUser,
    wallPosts,
    changingWall,
  ]);

  return (
    <div
      className={`feed${containerClass ? " " + containerClass : ""}`}
      style={{ height: height ?? "auto" }}
    >
      <div className="feed__container" ref={feedRef}>
        {page === "userFeed" && <StoryReel />}
        <MessageSender
          wallId={currentUser.id}
          currentUser={currentUser}
          currentUserPic={currentUserPic}
        />
        {page === "userFeed" && <VideoFeed />}
        {changingWall ? (
          <></>
        ) : (
          wallPosts.map((post) => {
            const commentIds = commentOrder[post.id];
            const commentsInPost = commentIds
              ? commentIds.map((id) => comments[id])
              : [];
            const commentUsers = commentsInPost.map(
              (comment) => users[comment.userId]
            );
            const commentUserPics = commentUsers.map(
              (user) => posts[user.profilePic]
            );

            return (
              <Post
                key={post.id}
                post={post}
                commentsInPost={commentsInPost}
                commentUsers={commentUsers}
                commentUserPics={commentUserPics}
                author={users[post.userId]}
                wall={users[post.wallId]}
                authorPic={posts[users[post.userId].profilePic]}
                feedRef={feedRef}
                page={page}
                currentUser={currentUser}
                currentUserPic={currentUserPic}
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
