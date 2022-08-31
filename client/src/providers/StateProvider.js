import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useRef
} from "react";
import db, { auth } from "../firebase";
import { actionTypes } from "../reducers/state_reducer";

const StateContext = createContext();
const ApiContext = createContext();

export const StateProvider = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    postOrder: null,
    posts: null,
    users: {},
    userWall: {
      postOrder: null,
      posts: null,
      users: {},
    },
    userFeed: {
      postOrder: null,
      posts: null,
      users: {},
    },
    uploadPhotoForm: {
      imageRef: null,
      imageContainerRef: null,
      imageThumbnailRef: null,
      croppedImageRef: null,
    },
  });

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ApiUtil>
        {children}
      </ApiUtil>
    </StateContext.Provider>
  );
};

const ApiUtil = ({ children }) => {
  const {state, dispatch} = useStateValue();
  const [initialRender, setInitialRender] = useState(true);
  const usersRef = useRef(state.users)

  useEffect(() => {
    usersRef.current = state.users
  }, [state.users])

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

  const getUserSnapshot = (ids) => {
    const filteredUsers = ids.filter(id => !usersRef.current[id])
    if (filteredUsers.length) {
      db.collectionGroup('users')
        .where('id', 'in', filteredUsers)
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_USERS,
            users: snapshot.docs.reduce((users, user) => ({[user.id]: user.data(), ...users}),{})
          })
        })
    }
  }

  const getPostData = async (ids = [], numberOfPosts) => {
    getUserSnapshot(ids)

    const promises = ids.map((userId) => {
      const startAt = !state.posts 
        ? null 
        : Object.values(state.posts).sort((x, y) => x.timestamp < y.timestamp ? 1 : -1).filter((post) => post.userId === userId && post.timestamp)

      let query = db
        .collectionGroup('posts')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
      if (startAt) query = query.startAfter(startAt[startAt.length - 1].timestamp)
      return query
        .limit(numberOfPosts / ids.length)
        .get((snapshot) => snapshot.docs)
    })

    Promise.all(promises).then((snapshots) => {
      const posts = snapshots.map(post => post.docs).flat().sort((x, y) => x.data().timestamp < y.data().timestamp ? 1 : -1).map(post => post.data().id)

      if (posts.length) {
        dispatch({
          type: actionTypes.SET_POST_ORDER,
          newPosts: posts
        })
        db.collectionGroup('posts')
          .where('id', 'in', posts)
          .onSnapshot((snapshot) => {
            dispatch({
              type: actionTypes.SET_POSTS,
              posts: snapshot.docs.map(doc => doc.data())
            })
          })
      }

    })
  };

  const getNewPostSnapshot = (filter, state) => {
    db.collection('users')
      .where(...filter)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const user = doc.data()
          db.collectionGroup('posts')
          .where('userId', '==', user.id)
          .orderBy('timestamp', 'desc')
          .limit(1)
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added" && snapshot.metadata.hasPendingWrites) {
                getUserSnapshot([change.doc.data().userId])
                dispatch({
                  type: actionTypes.SET_POST_ORDER,
                  newPosts: [change.doc.data().id],
                  new: true
                })

                db.collectionGroup('posts')
                  .where('id', '==', change.doc.data().id)
                  .onSnapshot((snapshot) => {
                    dispatch({
                      type: actionTypes.SET_POSTS,
                      posts: [snapshot.docs[0].data()]
                    })
                  })
              }
            })
          })
        })
      })
  }

  return (
    <ApiContext.Provider value={{ getPostData, getNewPostSnapshot }}>
      {initialRender ? <></> : children}
    </ApiContext.Provider>
  )
}

export const useStateValue = () => useContext(StateContext);
export const useApiUtil = () => useContext(ApiContext)
