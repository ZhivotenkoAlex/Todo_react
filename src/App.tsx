/* eslint-disable react/static-property-placement */
import React, { Component } from 'react'
import LoginView from './View/LoginView/index'
import TodoPageView from './View/ToDoPageView'
import './styles/App.scss'
import { Context } from './Context'

class App extends Component<{}, {}> {
  // eslint-disable-next-line react/static-property-placement
  static contextType = Context

  constructor(props: {}) {
    super(props)
  }

  render() {
    const { isLoggedIn, accessToken, refreshToken } = this.context

    return isLoggedIn ? (
      <TodoPageView accessToken={accessToken} refreshToken={refreshToken} />
    ) : (
      <LoginView />
    )
  }
}

export default App
