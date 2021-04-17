export const initialState = {
  initialRender: true,
  user: null,
}

export const actionTypes = {
  SET_USER: 'SET_USER'
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

    default:
      return state
  }
}

export default reducer