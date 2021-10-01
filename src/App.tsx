import React, { Component } from 'react'
import LoginView from './View/LoginView/index'
import TodoPageView from './View/ToDoPageView'
import './styles/App.scss'
import { Context } from './Context'

class App extends Component<{}, {}> {
  static contextType = Context

  constructor(props: {}) {
    super(props)
  }

  render() {
    const { isLoggedIn } = this.context

    return isLoggedIn ? <TodoPageView /> : <LoginView />
  }
}

export default App
