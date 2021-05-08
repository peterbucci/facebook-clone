export const initialState = {
  initialRender: true,
  user: null,
  currentProfile: {
    initialRender: true
  },
  postSnapshot: [],
  uploadPhotoForm: {
    imageRef: null,
    imageContainerRef: null,
    imageThumbnailRef: null,
    dragDropLayerRef: null,
    dragDropTransparentContainerRef: null,
    croppedImageRef: null,
  }
}

export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_CURRENT_PROFILE: 'SET_CURRENT_PROFILE',
  SET_POST_SNAPSHOT: 'SET_POST_SNAPSHOT',
  SET_UPLOAD_REFS: 'SET_UPLOAD_REFS',
}

const reducer = (state, action) => {
  console.log(action)
  switch(action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        initialRender: false
      }

    case actionTypes.SET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: {
          ...action.currentProfile,
          initialRender: false
        }
      }

    case actionTypes.SET_POST_SNAPSHOT:
      return {
        ...state,
        postSnapshot: {
          ...action.postSnapshot,
          initialRender: false
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

    default:
      return state
  }
}

export default reducer