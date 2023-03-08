export const actionTypes = {
  SET_USER: "SET_USER",
  SET_UPLOAD_REFS: "SET_UPLOAD_REFS",
  SET_LOG_OUT: "SET_LOG_OUT",
  SET_USERS: "SET_USERS",
  SET_POSTS: "SET_POSTS",
  SET_PROFILE: "SET_PROFILE",
  UPDATE_POST: "UPDATE_POST",
  SET_COMMENTS: "SET_COMMENTS",
  UPDATE_COMMENTS: "UPDATE_COMMENTS",
  UPDATE_USERS: "UPDATE_USERS",
  SET_PROFILE_DETAILS: "SET_PROFILE_DETAILS",
  ADD_PROFILE_DETAILS: "ADD_PROFILE_DETAILS",
  DELETE_PROFILE_DETAIL: "DELETE_PROFILE_DETAIL",
};

const reduceById = (arr) => {
  return arr.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );
};

const addToArray = (arr, newEl) => {
  const newElOrder = new Date(newEl.order).getTime();
  return arr.reduce((arr, el, i, originalArr) => {
    const elOrder = el.order.getTime
      ? el.order.getTime()
      : el.order.toDate().getTime();
    const nextEl = originalArr[i + 1];
    const nextOrder = nextEl
      ? nextEl.order.getTime
        ? nextEl.order.getTime()
        : nextEl.order.toDate().getTime()
      : null;
    return elOrder >= newElOrder && (!nextEl || nextOrder <= newElOrder)
      ? [...arr, el, newEl]
      : elOrder <= newElOrder && i === 0
      ? [...arr, newEl, el]
      : [...arr, el];
  }, []);
};

const deleteFromArray = (arr, idx) => {
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
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
        users: reduceById(action.users),
      };

    case actionTypes.UPDATE_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          ...reduceById(action.users),
        },
      };

    case actionTypes.SET_POSTS:
      return {
        ...state,
        wallId: action.wallId ?? state.wallId,
        posts: {
          ...(action.initialRender ? {} : state.posts),
          ...[...(action.posts ?? []), ...(action.profilePics ?? [])].reduce(
            (posts, post) => ({
              ...posts,
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
          : state.postOrder,
      };

    case actionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: reduceById(action.comments),
        commentOrder: action.comments.reduce((comments, comment) => {
          return {
            ...comments,
            [comment.postId]: [
              ...(comments[comment.postId] ? comments[comment.postId] : []),
              comment.id,
            ],
          };
        }, {}),
      };

    case actionTypes.UPDATE_COMMENTS:
      const newComments = action.comments.reduce((comments, comment) => {
        return {
          ...comments,
          [comment.postId]: [
            ...(action.new ? [comment.id] : []),
            ...(comments[comment.postId] ? comments[comment.postId] : []),
            ...(!action.new ? [comment.id] : []),
          ],
        };
      }, {});
      return {
        ...state,
        comments: {
          ...state.comments,
          ...reduceById(action.comments),
        },
        commentOrder: [
          ...Object.keys(state.commentOrder),
          ...Object.keys(newComments),
        ].reduce((comments, postId) => {
          return {
            ...comments,
            [postId]: [
              ...(newComments[postId] && !action.new
                ? newComments[postId]
                : []),
              ...(state.commentOrder[postId] ?? []),
              ...(newComments[postId] && action.new ? newComments[postId] : []),
            ],
          };
        }, {}),
      };

    case actionTypes.SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case actionTypes.UPDATE_POST:
      return {
        ...state,
        [action.collection]: {
          ...state[action.collection],
          [action.post.id]: action.post,
        },
      };

    case actionTypes.SET_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.profileDetails.reduce((categories, detail) => {
          return {
            ...categories,
            [detail.type]: categories[detail.type]
              ? [...categories[detail.type], detail]
              : [detail],
          };
        }, {}),
      };

    case actionTypes.ADD_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: {
          ...state.profileDetails,
          ...action.profileDetails.reduce((categories, detail) => {
            return {
              ...categories,
              [detail.type]: categories[detail.type]
                ? [...categories[detail.type], detail]
                : [
                    ...(state.profileDetails[detail.type]
                      ? addToArray(state.profileDetails[detail.type], detail)
                      : [detail]),
                  ],
            };
          }, {}),
        },
      };

      case actionTypes.UPDATE_PROFILE_DETAIL:
        let orderedDetails = deleteFromArray(state.profileDetails[action.detailType], action.idx)
        orderedDetails = addToArray(orderedDetails, action.updatedDetail)
        return {
          ...state,
          profileDetails: {
            ...state.profileDetails,
            [action.detailType]: orderedDetails
          }
        }

    case actionTypes.DELETE_PROFILE_DETAIL:
      return {
        ...state,
        profileDetails: {
          ...state.profileDetails,
          [action.detailType]: deleteFromArray(
            state.profileDetails[action.detailType],
            action.idx
          ),
        },
      };

    default:
      return state;
  }
};

export default reducer;
