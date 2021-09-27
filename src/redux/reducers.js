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
        isLoggedIn: [action.isLoggedIn],
        accessToken: [action.accessToken],
        refreshToken: [action.refreshToken],
      }

    default:
      return state
  }
}

export default reducer
