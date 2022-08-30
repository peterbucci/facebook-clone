export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_POST_SNAPSHOT: 'SET_POST_SNAPSHOT',
  SET_UPLOAD_REFS: 'SET_UPLOAD_REFS',
  SET_LOG_OUT: 'SET_LOG_OUT',
  SET_USERS: 'SET_USERS',
  SET_POSTS: 'SET_POSTS',
  SET_POST_ORDER: 'SET_POST_ORDER'
}

const reducer = (state, action) => {
  switch(action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      }

    case actionTypes.SET_POST_SNAPSHOT:
      return {
        ...state,
        postSnapshot: {
          ...action.postSnapshot,
        }
      }

    case actionTypes.SET_UPLOAD_REFS:
      return {
        ...state,
        uploadPhotoForm: {
          ...state.uploadPhotoForm,
          ...action.uploadRefs
        }
      }

    case actionTypes.SET_USERS:
      return {
        ...state,
        fetchPosts: true,
        users: {
          ...state.users,
          ...action.users
        }
      }

    case actionTypes.SET_POSTS:
      return {
        ...state,
        fetchPosts: false,
        posts: {
          ...(state.posts ? state.posts : {}),
          ...action.posts.reduce((posts, post) => ({...posts, [post.id]: post}), {})
        }
      }

      case actionTypes.SET_POST_ORDER:
        return {
          ...state,
          fetchPosts: false,
          postOrder: [
            ...(action.new ? action.newPosts : []),
            ...(state.postOrder ? state.postOrder : []),
            ...(!action.new ? action.newPosts : [])
          ]
        }

    default:
      return state
  }
}

export default reducer