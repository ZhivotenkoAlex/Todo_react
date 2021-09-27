import reducer from './reducers'

let state

const getState = () => state

const listeners = []

const dispatch = action => {
  state = reducer(action, state)
  listeners.forEach(listener => listener())
}

const subscribe = listener => {
  listeners.push(listener)
  return () => {
    listeners.filter(lis => lis !== listener)
  }
}

dispatch({})

const reducers = () => reducer

reducers()

function Async(cb, request) {
  request(cb)
}

const thunk = (cb, request, delay) => {
  if (delay) {
    return setTimeout(() => {
      Async(cb, request)
    }, delay)
  }
  Async(cb, request)
  return undefined
}

export { getState, dispatch, thunk, subscribe }
