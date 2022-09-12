import React, { createContext, useContext } from "react";
import db from "firebase.js";
import { actionTypes } from "reducers/state_reducer";
import { useStateValue } from "./StateProvider";

const ApiContext = createContext();

export const ApiUtil = ({ children }) => {
  const { state, dispatch } = useStateValue();

  const getUsers = async (ids, initialRender) => {
    const { users } = state.feed;
    const filteredUsers = initialRender ? ids : ids.filter((id) => !users[id]);
    const profilePicIds = [];
    const requestedUsers = filteredUsers.length
      ? await db
          .collectionGroup("users")
          .where("id", "in", filteredUsers)
          .get()
          .then((snapshot) => {
            return snapshot.docs.reduce((users, user) => {
              const userData = user.data();
              if (userData.profilePic) profilePicIds.push(userData.profilePic);
              return {
                [user.id]: {
                  ...userData,
                },
                ...users,
              };
            }, {});
          })
      : {};

    profilePicIds.length &&
      (await db
        .collectionGroup("posts")
        .where("id", "in", profilePicIds)
        .get()
        .then((snapshot) =>
          snapshot.docs.forEach(
            (doc) =>
              (requestedUsers[doc.data().userId].profilePicData = doc.data())
          )
        ));

    return requestedUsers;
  };

  const getPosts = (userId, posts, additionalFilter, limit, initialRender) => {
    const startAt =
      !posts || initialRender
        ? []
        : Object.values(posts)
            .sort((x, y) => (x.timestamp < y.timestamp ? 1 : -1))
            .filter((post) => post.userId === userId && post.timestamp);

    let query = db.collectionGroup("posts").where("userId", "==", userId);

    if (additionalFilter) query = query.where(...additionalFilter);
    query = query.orderBy("timestamp", "desc");

    if (startAt.length)
      query = query.startAfter(startAt[startAt.length - 1].timestamp);

    return query
      .limit(limit)
      .get()
      .then((snapshot) => {
        return snapshot.docs;
      });
  };

  const getComments = (
    postId,
    limit,
    endBefore,
    orderBy = ["timestamp", "desc"]
  ) => {
    let query = db
      .collectionGroup("comments")
      .where("postId", "==", postId)
      .orderBy(...orderBy);
    if (endBefore) query = query.endBefore(endBefore);
    if (limit) query = query.limit(limit);
    return query
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => doc.data()));
  };

  const getSingleCommentFeed = (postId, endBefore) => {
    getComments(postId, null, endBefore, ["timestamp"]).then((comments) => {
      dispatch({
        type: actionTypes.UPDATE_COMMENTS,
        postId,
        comments,
      });
    });
  };

  const getProfile = async (profileURL, uid, pid) => {
    let user = db.collection("users");
    user = profileURL ? user.where("url", "==", profileURL) : user.doc(uid);
    user = await user
      .get()
      .then((res) => (profileURL ? res.docs[0].data() : res.data()));
    const profilePicData = user.profilePic
      ? await db
          .collection("users")
          .doc(user.id)
          .collection("posts")
          .doc(user.profilePic)
          .get()
          .then((res) => res.data())
      : null;

    const pic = pid || user.profilePic
      ? await db
        .collection("users")
        .doc(user.id)
        .collection("posts")
        .doc(pid || user.profilePic)
        .get()
        .then((res) => res.data())
      : null

    return {
      user: {
        ...user,
        profilePicData
      },
      pic,
    };
  };

  const setPreloadedProfile = async (user, pic) => {
    await dispatch({
      type: actionTypes.SET_PRELOADED_PROFILE,
      preloadedProfile: {
        user,
        pic,
      },
    });

    return true;
  };

  const getFeedData = async (
    posts,
    ids = [],
    numberOfPosts,
    additionalFilter,
    initialRender,
    wallId
  ) => {
    const postQueries = ids.map((userId) =>
      getPosts(
        userId,
        posts,
        additionalFilter,
        numberOfPosts / ids.length,
        initialRender
      )
    );

    let newPosts = await Promise.all(postQueries);
    newPosts = newPosts
      .flat()
      .sort((x, y) => (x.data().timestamp < y.data().timestamp ? 1 : -1))
      .map((post) => post.data());

    let commentQueries = newPosts.map((post, i, arr) =>
      getComments(post.id, 1)
    );
    let newComments = await Promise.all(commentQueries);
    newComments = newComments.flat();

    const newUsers = await getUsers(
      [...new Set([...ids, ...newComments.map((comment) => comment.userId)])],
      initialRender
    );

    if (newPosts.length) {
      dispatch({
        type: actionTypes.SET_WALL_ID,
        wallId,
      });
      dispatch({
        type: actionTypes.SET_USERS,
        users: newUsers,
        initialRender,
      });
      dispatch({
        type: actionTypes.SET_POSTS,
        posts: newPosts,
        initialRender,
      });
      dispatch({
        type: actionTypes.SET_COMMENTS,
        comments: newComments,
        initialRender,
      });
    }
  };

  const addNewPost = async (userId, wallId, timestamp, message, image) => {
    const postQuery = db
      .collection("users")
      .doc(userId)
      .collection("posts")
      .doc();
    const id = postQuery.id;
    const postContent = {
      id,
      type: "Wall Post",
      userId,
      wallId,
      timestamp,
      message,
      image,
      reactions: {
        like: [],
      },
    };

    await postQuery.set(postContent);
    const newPost = await postQuery.get();
    const newUser = await getUsers([userId, wallId]);
    dispatch({
      type: actionTypes.SET_USERS,
      users: newUser,
    });
    dispatch({
      type: actionTypes.SET_POSTS,
      posts: [newPost.data()],
      new: true,
    });
  };

  const addNewComment = (
    originalUserId,
    userId,
    postId,
    message,
    timestamp,
    aggregateCount,
    parentComment = false
  ) => {
    const newCommentDoc = db
      .collection("users")
      .doc(originalUserId)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc();

    const newComment = {
      id: newCommentDoc.id,
      image: "",
      message,
      postId,
      timestamp,
      userId,
      reactions: {
        like: [],
      },
      parentComment,
      aggregateCount: aggregateCount ? aggregateCount + 1 : 1,
    };

    newCommentDoc.set(newComment).then(() => {
      newCommentDoc.get().then((snapshot) => {
        dispatch({
          type: actionTypes.SET_COMMENTS,
          comments: [snapshot.data()],
          new: true,
        });
      });
    });
  };

  const handleReactionClick = (
    reactions,
    type,
    userId,
    post,
    idx,
    collection,
    comment
  ) => {
    const change =
      reactions[type].indexOf(userId) >= 0
        ? { [type]: reactions[type].filter((reaction) => reaction !== userId) }
        : { [type]: [...reactions[type], userId] };
    const updatedPost = {
      ...(collection === "comments" ? comment : post),
      reactions: {
        ...reactions,
        ...change,
      },
    };

    let postQuery = db.collection("users").doc(post.userId).collection("posts");

    if (collection === "comments")
      postQuery = postQuery
        .doc(comment.postId)
        .collection("comments")
        .doc(comment.id)
        .update(updatedPost);
    else postQuery.doc(post.id).update(updatedPost);

    dispatch({
      type: actionTypes.UPDATE_POST,
      post: updatedPost,
      idx,
      collection,
    });
  };

  return (
    <ApiContext.Provider
      value={{
        getFeedData,
        addNewPost,
        handleReactionClick,
        addNewComment,
        getSingleCommentFeed,
        getProfile,
        setPreloadedProfile,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiUtil = () => useContext(ApiContext);
