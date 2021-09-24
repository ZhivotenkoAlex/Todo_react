import React, { Component } from 'react'
import LoginView from './View/LoginView/index'
import TodoPageView from './View/ToDoPageView'
import './styles/App.scss'
import { IAppState, ITokens } from './types/generalTypes'

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isLoggedIn: false,
      accessToken: '',
      refreshToken: '',
    }
  }

  getStatus = (tokens: ITokens): void => {
    this.setState({
      isLoggedIn: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    })
  }

  render() {
    const { isLoggedIn, accessToken, refreshToken } = this.state
    return isLoggedIn ? (
      <TodoPageView accessToken={accessToken} refreshToken={refreshToken} />
    ) : (
      <LoginView getStatus={this.getStatus} />
    )
  }
}

export default App
