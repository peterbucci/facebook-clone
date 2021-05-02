export const initialState = {
  initialRender: true,
  user: null,
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