import db from "firebase.js";
import { actionTypes } from "reducers/state_reducer";

const getUsers = async (ids, initialRender, state) => {
  const { users } = state;
  const filteredUsers = initialRender ? ids : ids.filter((id) => !users[id]);
  const profilePicIds = [];
  const requestedUsers = filteredUsers.length
    ? await db
        .collectionGroup("users")
        .where("id", "in", filteredUsers)
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((user) => {
            const userData = user.data();
            if (userData.profilePic) profilePicIds.push(userData.profilePic);
            return userData;
          });
        })
    : [];

  const requestedProfilePics = profilePicIds.length
    ? await db
        .collectionGroup("posts")
        .where("id", "in", profilePicIds)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => doc.data()))
    : null;

  return {
    requestedUsers,
    requestedProfilePics,
  };
};

export const getPosts = (userId, posts, additionalFilter, limit, initialRender) => {
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

  if (limit) query = query.limit(limit);

  return query.get().then((snapshot) => {
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
  return query.get().then((snapshot) => snapshot.docs.map((doc) => doc.data()));
};

export const getSingleCommentFeed = async (
  postId,
  endBefore,
  update,
  dispatch
) => {
  await getComments(postId, null, endBefore, ["timestamp"]).then((comments) => {
    dispatch({
      type: actionTypes[update],
      comments,
    });
  });
};

export const getFeedData = async (
  posts,
  ids = [],
  numberOfPosts,
  additionalFilter,
  initialRender,
  wallId,
  dispatch,
  state,
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

  let commentQueries = newPosts.map((post, i, arr) => getComments(post.id, 1));
  let newComments = await Promise.all(commentQueries);
  newComments = newComments.flat();

  const newUserData = await getUsers(
    [...new Set([...ids, ...newComments.map((comment) => comment.userId)])],
    initialRender,
    state
  );

  if (newPosts.length) {
    dispatch({
      type: initialRender ? actionTypes.SET_USERS : actionTypes.UPDATE_USERS,
      users: newUserData.requestedUsers,
    });
    dispatch({
      type: actionTypes.SET_POSTS,
      profilePics: newUserData.requestedProfilePics,
      posts: newPosts,
      wallId,
      initialRender,
    });
    dispatch({
      type: initialRender
        ? actionTypes.SET_COMMENTS
        : actionTypes.UPDATE_COMMENTS,
      comments: newComments,
    });
  }
};

export const addNewPost = async (
  userId,
  wallId,
  timestamp,
  message,
  image,
  dispatch,
  state
) => {
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
    }
  };

  await postQuery.set(postContent);
  const newPost = await postQuery.get();
  const userData = await getUsers([userId, wallId], false, state);

  dispatch({
    type: actionTypes.UPDATE_USERS,
    users: userData.requestedUsers,
  });
  dispatch({
    type: actionTypes.SET_POSTS,
    posts: [newPost.data()],
    profilePics: userData.requestedProfilePics,
    new: true,
  });
};

export const addNewComment = (
  originalUserId,
  userId,
  postId,
  message,
  timestamp,
  aggregateCount,
  parentComment,
  dispatch
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
        type: actionTypes.UPDATE_COMMENTS,
        comments: [snapshot.data()],
        new: true,
      });
    });
  });
};

export const handleReactionClick = (
  reactions,
  type,
  userId,
  post,
  collection,
  comment,
  dispatch
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
    collection,
  });
};
