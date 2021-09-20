import { Component } from 'react';
import ApiServices from '../Model/apiServices.jsx';

export default class UserController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new ApiServices('http://localhost:8080'),
    };
  }

  async login(data) {
    try {
      // eslint-disable-next-line react/destructuring-assignment
      const tokens = await this.state.api.post('/api/auth/login', {
        email: data.email,
        password: data.password,
      });
      if (tokens.accessToken && tokens.refreshToken) {
        return tokens;
      }
      return new Error({ error: 'Wrong credentials' });
    } catch (error) {
      return new Error({ error: error.message });
    }
  }

  async register(data) {
    try {
      // eslint-disable-next-line react/destructuring-assignment
      this.state.api.post('/api/user', {
        email: data.email,
        password: data.password,
      });

      return `User "${data.email}" was added!`;
    } catch (error) {
      return new Error({ error: error.message });
    }
  }

  async authentification(data) {
    const isLoggedIn = await this.isLoggedIn(data.email);
    const messageEmptyFields = 'Please, enter your email and password';
    const messageValidateEmail = 'Please, enter the correct email using the following pattern: xxxx@xxx.xx';
    const messagePasswordLength = 'Please lengthen this text to 6 characters or more';

    if (
      data.email === ''
          || data.password === ''
    ) {
      return new Error(messageEmptyFields);
    }
    if (!this.validateEmail(data.email)) {
      return new Error(messageValidateEmail);
    }
    if (data.password.length < 6) {
      return new Error(messagePasswordLength);
    }
    if (isLoggedIn === true) {
      const tokens = await this.login({ email: data.email, password: data.password });
      return tokens;
    }
    if (isLoggedIn === false) {
      this.register({ email: data.email, password: data.password });
      return { sucess: `user ${data.email} is registered. Please login!` };
    }
    return undefined;
  }

  async isLoggedIn(email) {
    const { api } = this.state;
    try {
      const user = await api.getUser(email);
      return !!user.userId;
    } catch (error) {
      return new Error({ error: error.message });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validateEmail(email) {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return reg.test(String(email).toLowerCase());
  }
}
