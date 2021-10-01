const initialState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  itemList: [],
}

function reducer(action, state = initialState) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      }
    case 'GET_ITEMS':
      return {
        ...state,
        itemList: action.payload,
      }
    case 'ADD_ITEM':
      return {
        ...state,
        itemList: action.payload,
      }
    case 'SET_CHECK_TODO':
      return {
        ...state,
        itemList: action.payload.itemList,
      }
    case 'EDIT_TODO':
      return {
        ...state,
        itemList: action.payload.itemList,
      }
    case 'DELETE_TODO':
      return {
        ...state,
        itemList: action.payload.itemList,
      }
    case 'ADD_PROPS':
      return {
        ...state,
        props: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
