import { createContext, useContext } from "react";
import {
  getProfile,
  getProfileDetails,
  addProfileDetail,
  deleteProfileDetail,
  getAlbums,
} from "common/api_util/profile";
import {
  getFeedData,
  handleReactionClick,
  addNewComment,
  addNewPost,
  getSingleCommentFeed,
  getPosts,
} from "common/api_util/posts";
import { useStateValue } from "./StateProvider";
const ApiContext = createContext();

export const ApiUtil = ({ children }) => {
  const { state, dispatch } = useStateValue();

  return (
    <ApiContext.Provider
      value={{
        getFeedData: (...props) => getFeedData(...props, dispatch, state),
        addNewPost: (...props) => addNewPost(...props, dispatch, state),
        handleReactionClick: (...props) =>
          handleReactionClick(...props, dispatch),
        addNewComment: (...props) => addNewComment(...props, dispatch),
        addProfileDetail: (...props) => addProfileDetail(...props, dispatch),
        getSingleCommentFeed: (...props) =>
          getSingleCommentFeed(...props, dispatch),
        getProfile: (profileURL, uid, pid) =>
          getProfile(profileURL, uid, pid, dispatch),
        getPosts,
        getAlbums: (...props) => getAlbums(...props, dispatch),
        getProfileDetails: (...props) => getProfileDetails(...props, dispatch),
        deleteProfileDetail: (...props) => deleteProfileDetail(...props, dispatch),
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiUtil = () => useContext(ApiContext);
