/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import LoginView from './View/LoginView/index'
import TodoPageView from './View/ToDoPageView'
import './styles/App.scss'
import { Context } from './Context'
import { getState } from './redux/store'
// import reducer from './redux/reducers'

class App extends Component<{}, {}> {
  static contextType = Context

  constructor(props: {}) {
    super(props)
  }

  render() {
    const { isLoggedIn } = getState()
    return isLoggedIn ? <TodoPageView /> : <LoginView />
  }
}

// const action = 'LOGIN'

// const state = getState()
// const { isLoggedIn } = state

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.isLoggedIn,
})
console.log(mapStateToProps(getState()))

export default App
// const mapDispatchToProps = () => reducer(action)

// export default connect(mapStateToProps, mapDispatchToProps)(App)
