/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable func-names */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react'
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

// export { getState, dispatch, request }

function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    return class extends Component {
      render() {
        const state1 = getState()
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(state1)}
            {...mapDispatchToProps(reducer, this.props)}
          />
        )
      }
    }
  }
}

export { getState, dispatch, request, connect }
