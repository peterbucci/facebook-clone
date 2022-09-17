import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import db, { auth } from "firebase.js";
import { ApiUtil } from "./ApiUtil";
import { actionTypes } from "reducers/state_reducer";

const StateContext = createContext();

export const StateProvider = ({ reducer, children }) => {
  const [initialRender, setInitialRender] = useState(true);
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    users: {},
    posts: {},
    postOrder: [],
    commentOrder: {},
    uploadPhotoForm: {
      imageRef: null,
      imageContainerRef: null,
      imageThumbnailRef: null,
      croppedImageRef: null,
    },
  });

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { displayName, email } = authUser;

        db.collection("users")
          .where("email", "==", email)
          .onSnapshot(async (snapshot) => {
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
                type: actionTypes.SET_USERS,
                users: [newUser]
              });
              dispatch({
                type: actionTypes.SET_USER,
                user: newUser.id,
              });
            } else {
              const userDoc = snapshot.docs[0];
              const user = userDoc.data();
              const profilePic = user.profilePic
              const profilePicData = profilePic
                ? await userDoc.ref
                    .collection("posts")
                    .doc(profilePic)
                    .get()
                    .then((snapshot) => snapshot.data())
                : null;

              dispatch({
                type: actionTypes.SET_USERS,
                users: [user]
              });
              dispatch({
                type: actionTypes.SET_POSTS,
                posts: [profilePicData]
              });
              dispatch({
                type: actionTypes.SET_USER,
                user: user.id,
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
  console.log(state)
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ApiUtil>{initialRender ? <></> : children}</ApiUtil>
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
