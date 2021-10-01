/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component, createContext } from 'react'
import { getState } from './redux/store'

type contextState = {
  accessToken: string
  refreshToken: string
  isLoggedin: boolean
  toggleLog: any
}

export const Context = createContext<contextState>(getState())

class LogProvider extends Component<{}, contextState> {
  state: contextState = getState()

  constructor(props: {}) {
    super(props)
    this.toggleLog = this.toggleLog.bind(this)
  }

  toggleLog() {
    this.setState(getState())
    return 'ok'
  }

  render() {
    return (
      <Context.Provider value={{ ...this.state, toggleLog: this.toggleLog }}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
export default LogProvider
