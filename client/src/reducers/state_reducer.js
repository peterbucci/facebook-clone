export const actionTypes = {
  SET_USER: "SET_USER",
  SET_UPLOAD_REFS: "SET_UPLOAD_REFS",
  SET_LOG_OUT: "SET_LOG_OUT",
  SET_USERS: "SET_USERS",
  SET_POSTS: "SET_POSTS",
  SET_WALL_ID: "SET_WALL_ID",
  SET_PROFILE: "SET_PROFILE",
  SET_PRELOADED_PROFILE: "SET_PRELOADED_PROFILE",
  UPDATE_POST: "UPDATE_POST",
  UPDATE_COMMENTS: "UPDATE_COMMENTS",
  SET_COMMENTS: "SET_COMMENTS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.SET_UPLOAD_REFS:
      return {
        ...state,
        uploadPhotoForm: {
          ...state.uploadPhotoForm,
          ...action.uploadRefs,
        },
      };

    case actionTypes.SET_USERS:
      return {
        ...state,
        feed: {
          ...state.feed,
          users: {
            ...(action.initialRender ? [] : state.feed.users),
            ...action.users,
          },
        },
        db: {
          ...state.db,
          gettingUsers: false,
        },
      };

    case actionTypes.SET_POSTS:
      return {
        ...state,
        feed: {
          ...state.feed,
          posts: [
            ...(action.new ? action.posts : []),
            ...(action.initialRender ? [] : state.feed.posts),
            ...(!action.new ? action.posts : []),
          ],
        },
        db: {
          ...state.db,
          gettingPosts: false,
        },
      };

    case actionTypes.SET_COMMENTS:
      return {
        ...state,
        feed: {
          ...state.feed,
          comments: {
            ...(action.initialRender ? {} : state.feed.comments),
            ...action.comments.reduce((comments, comment) => {
              return {
                ...comments,
                [comment.postId]: [
                  ...(state.feed.comments[comment.postId] &&
                  !action.initialRender
                    ? state.feed.comments[comment.postId]
                    : []),
                  comment,
                ],
              };
            }, {}),
          },
        },
        db: {
          ...state.db,
          gettingComments: action.gettingComments,
        },
      };

    case actionTypes.UPDATE_COMMENTS:
      return {
        ...state,
        feed: {
          ...state.feed,
          comments: {
            ...state.feed.comments,
            [action.postId]: [...action.comments, ...state.feed.comments[action.postId]]
          }
        }
      };

    case actionTypes.SET_PROFILE:
        return {
          ...state,
          profile: action.profile
        };

    case actionTypes.SET_PRELOADED_PROFILE:
      return {
        ...state,
        preloadedProfile: action.preloadedProfile
      };

    case actionTypes.SET_WALL_ID:
      return {
        ...state,
        feed: {
          ...state.feed,
         wallId: action.wallId
        }
      };

    case actionTypes.UPDATE_POST:
      return {
        ...state,
        feed: {
          ...state.feed,
          ...(action.collection === 'posts'
            ? { posts: state.feed.posts.map((post, idx) => idx === action.idx ? action.post : post )}
            : {
              comments: {
                ...state.feed.comments,
                [action.post.postId]: state.feed.comments[action.post.postId].map((comment, idx) => idx === action.idx ? action.post : comment )
              }
            }
          ),
        },
      };

    default:
      return state;
  }
};

export default reducer;
