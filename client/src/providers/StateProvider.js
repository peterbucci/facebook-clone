import React, {
  createContext,
  useContext,
  useReducer,
} from "react";
import { ApiUtil } from "./ApiUtil";

const StateContext = createContext();

export const StateProvider = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    feed: {
      posts: [],
      users: {},
      comments: {},
    },
    db: {
      gettingUsers: true,
      gettingPosts: true,
      gettingComments: true,
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
      <ApiUtil>{children}</ApiUtil>
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
