export const actionTypes = {
  SET_USER: "SET_USER",
  SET_UPLOAD_REFS: "SET_UPLOAD_REFS",
  SET_LOG_OUT: "SET_LOG_OUT",
  SET_USERS: "SET_USERS",
  SET_POSTS: "SET_POSTS",
  SET_PROFILE: "SET_PROFILE",
  UPDATE_POST: "UPDATE_POST",
  SET_COMMENTS: "SET_COMMENTS",
  UPDATE_COMMENTS: "UPDATE_COMMENTS"
};

const reduceById = (arr) => {
  return arr.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  )
}

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
        users: reduceById(action.users)
      };

    case actionTypes.UPDATE_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          ...reduceById(action.users)
        },
      };

    case actionTypes.SET_POSTS:
      return {
        ...state,
        wallId: action.wallId ?? state.wallId,
        posts: {
          ...(action.initialRender ? {} : state.posts),
          ...[
            ...(action.posts ?? []),
            ...(action.profilePics ?? []),
          ].reduce(
            (Posts, post) => ({
              ...Posts,
              [post.id]: post,
            }),
            {}
          ),
        },
        postOrder: action.posts
          ? [
              ...(action.new ? action.posts.map((post) => post.id) : []),
              ...(action.initialRender ? [] : state.postOrder),
              ...(!action.new ? action.posts.map((post) => post.id) : []),
            ]
          : state.postOrder
      };

    case actionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: reduceById(action.comments),
        commentOrder: action.comments.reduce((comments, comment) => {
                return {
                  ...comments,
                  [comment.postId]: [
                    ...(comments[comment.postId]
                      ? comments[comment.postId]
                      : []),
                    comment.id,
                  ],
                };
              }, {})
      };

    case actionTypes.UPDATE_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          ...reduceById(action.comments)
        },
        commentOrder: {
          ...state.commentOrder,
          ...action.comments.reduce((comments, comment) => {
                return {
                  ...comments,
                  [comment.postId]: [
                    ...(comments[comment.postId]
                      ? comments[comment.postId]
                      : state.commentOrder[comment.postId]
                      ? state.commentOrder[comment.postId]
                      :[]),
                    comment.id,
                  ],
                };
              }, {})
            }
      };
    
    case actionTypes.SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case actionTypes.UPDATE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.id]: action.post,
        },
      };

    default:
      return state;
  }
};

export default reducer;
