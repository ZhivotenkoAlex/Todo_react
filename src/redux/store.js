import reducer from './reducers'

let state

const getState = () => state

const dispatch = action => {
  state = reducer(action, state)
}

dispatch({})

const reducers = () => reducer

reducers()

const request = async (actionType, req, data) => {
  const res = data ? await req(data) : await req()
  dispatch({ type: actionType, payload: res })
}

export { getState, dispatch, request }
