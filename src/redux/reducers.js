const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
}

function reducer(action, state = initialState) {
  switch (action.type) {
    case 'GET_STATE':
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }

    default:
      return state
  }
}

export default reducer
