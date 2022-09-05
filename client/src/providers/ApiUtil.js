import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import db, { auth } from "../firebase";
import { actionTypes } from "../reducers/state_reducer";
import { useStateValue } from "./StateProvider";

const ApiContext = createContext();

export const ApiUtil = ({ children }) => {
  const { state, dispatch } = useStateValue();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { displayName, email } = authUser;

        db.collection("users")
          .where("email", "==", email)
          .onSnapshot((snapshot) => {
            if (snapshot.empty) {
              const ref = db.collection("users").doc();
              const id = ref.id;
              const newUser = {
                id,
                profilePic: null,
                firstName: displayName,
                lastName: "",
                email: email,
                notifications: {
                  comments: [],
                  reactions: {
                    like: [],
                  },
                },
              };

              db.collection("users").doc(id).set(newUser);

              dispatch({
                type: actionTypes.SET_USER,
                user: newUser,
              });
            } else {
              const user = snapshot.docs[0].data();
              const userId = snapshot.docs[0].id;
              dispatch({
                type: actionTypes.SET_USER,
                user: {
                  id: userId,
                  ...user,
                },
              });
            }
            setInitialRender(false);
          });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
        setInitialRender(false);
      }
    });
  }, [dispatch]);

  const getUsers = (ids, initialRender) => {
    const { users } = state.feed
    const filteredUsers = initialRender ? ids : ids.filter((id) => !users[id]);
    return filteredUsers.length 
      ? db.collectionGroup("users")
        .where("id", "in", filteredUsers)
        .get()
        .then((snapshot) => {
          return snapshot.docs.reduce((users, user) => ({ 
            [user.id]: user.data(), 
            ...users 
          }), {})
        })
      : {}
  }

  const getPosts = (userId, posts, additionalFilter, limit, initialRender) => {
    const startAt = !posts || initialRender
      ? []
      : Object.values(posts)
          .sort((x, y) => (x.timestamp < y.timestamp ? 1 : -1))
          .filter((post) => post.userId === userId && post.timestamp);

    let query = db.collectionGroup("posts").where("userId", "==", userId);

    if (additionalFilter) query = query.where(...additionalFilter);
    query = query.orderBy("timestamp", "desc");

    if (startAt.length)
      query = query.startAfter(startAt[startAt.length - 1].timestamp);

    return query.limit(limit).get().then((snapshot) => {
      console.log(snapshot.docs.map(doc => doc.data()))
      return snapshot.docs
    });
  };

  const getComments = (postId, limit, orderBy = ["timestamp", 'desc']) => {
    let query = db
      .collectionGroup("comments")
      .where("postId", "==", postId)
      .orderBy(...orderBy)
    if (limit) query = query.limit(limit)
    return query
      .get()
      .then((snapshot) => snapshot.docs.map(doc => doc.data()));
  }

  const getSingleCommentFeed = (postId) => {
    getComments(postId, null, ["timestamp"]).then((comments) => {
      console.log(comments, 'comments')
      dispatch({
        type: actionTypes.UPDATE_COMMENTS,
        postId,
        comments,
      });
    })
  }

  const getFeedData = async (    
    ids = [],
    numberOfPosts,
    additionalFilter,
    initialRender
  ) => {
      const  {posts} = state.feed
      const postQueries = ids.map((userId) =>
        getPosts(userId, posts, additionalFilter, numberOfPosts / ids.length, initialRender)
      );

      let newPosts = await Promise.all(postQueries)
      newPosts = newPosts
        .flat()
        .sort((x, y) => (x.data().timestamp < y.data().timestamp ? 1 : -1))
        .map((post) => post.data());

      let commentQueries = newPosts.map((post, i, arr) => getComments(post.id, 1))
      let newComments = await Promise.all(commentQueries)
      newComments = newComments.flat()

      const newUsers = await getUsers([...new Set([...ids, ...newComments.map(comment => comment.userId)])], initialRender);

      if (newPosts.length) {
        dispatch({
          type: actionTypes.SET_USERS,
          users: newUsers,
          initialRender
        });
        dispatch({
          type: actionTypes.SET_POSTS,
          posts: newPosts,
          initialRender
        });
        dispatch({
          type: actionTypes.SET_COMMENTS,
          comments: newComments,
          initialRender
        });
      }
  }

  const addNewPost = (userId, wallId, timestamp, message, image) => {
    const newPost = db.collection('users')
      .doc(userId)
      .collection('posts')
      .doc()
    const id = newPost.id
    const postContent = {
      id,
      type: 'Wall Post',
      userId,
      wallId,
      timestamp,
      message,
      image,
      reactions: {
        like: []
      }
    }

    newPost.set(postContent).then(() => {
      newPost.get().then((snapshot) => {
        dispatch({
          type: actionTypes.SET_POSTS,
          posts: [snapshot.data()],
          new: true
        });
      })
    })
  }

  const addNewComment = (userId, postId, message, timestamp, aggregateCount) => {
    const newCommentDoc = db
      .collection("users")
      .doc(userId)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc()

    const newComment = {
      id: newCommentDoc.id,
      image: "",
      message,
      postId,
      timestamp,
      userId,
      aggregateCount: aggregateCount ? aggregateCount + 1 : 1
    }

    newCommentDoc.set(newComment).then(() => {
      newCommentDoc.get().then((snapshot) => {
        dispatch({
          type: actionTypes.SET_COMMENTS,
          comments: [snapshot.data()],
          new: true
        });
      })
    })
  }

  const handleReactionClick = (reactions, type, userId, post, idx) => {
    const change = reactions[type].indexOf(userId) >= 0
      ? {[type]: reactions[type].filter(reaction => reaction !== userId)}
      : {[type]: [...reactions[type], userId]}
    const updatedPost = {
      ...post,
      reactions: {
        ...reactions,
        ...change
      }
    }

    db.collection("users")
      .doc(userId)
      .collection("posts")
      .doc(post.id)
      .set(updatedPost)
    
    dispatch({
      type: actionTypes.UPDATE_POST,
      post: updatedPost,
      idx
    });
  }

  return (
    <ApiContext.Provider value={{ getFeedData, addNewPost, handleReactionClick, addNewComment, getSingleCommentFeed }}>
      {initialRender ? <></> : children}
    </ApiContext.Provider>
  );
};

export const useApiUtil = () => useContext(ApiContext);