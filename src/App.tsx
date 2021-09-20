import React, { Component } from 'react';
import LoginView from './View/LoginView/index.jsx';
import TodoPageView from './View/ToDoPageView/index.jsx';
import './styles/App.module.css';
import { IAppProps, IAppState, ITokens } from './types/generalTypes';

class App extends Component<IAppProps, IAppState> {
  constructor(props:IAppProps) {
    super(props);
    this.state = {
      isLoggedIn: false,
      accessToken: '',
      refreshToken: '',
    };
  }

  getStatus=(tokens:ITokens):void => {
    this.setState({
      isLoggedIn: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }

  render() {
    console.log('props');

    console.log(this.props);

    const { isLoggedIn, accessToken, refreshToken } = this.state;
    return (
      isLoggedIn ? <TodoPageView accessToken = {accessToken} refreshToken = {refreshToken} />
        : <LoginView getStatus = {this.getStatus} />
    );
  }
}

export default App;
