import React, { Component } from 'react';
import LoginView from './View/LoginView/index.jsx';
import TodoPageView from './View/ToDoPageView/index.jsx';
import "./styles/App.module.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      accessToken: '',
      refreshToken: '',
    };
  }

  getStatus=(tokens)=>{
    this.setState({
      isLoggedIn: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }

  render() {
    const { isLoggedIn, accessToken, refreshToken } = this.state;
    return (
      isLoggedIn ? <TodoPageView accessToken = {accessToken} refreshToken = {refreshToken} />
        : <LoginView getStatus = {this.getStatus} />
    );
  }
}

export default App;
