import { Component } from 'react';
import ApiServices from '../Model/apiServices';
import { IUserControllerState, ICredentials, IUser } from '../types/authTypes';
import { IPostData } from '../types/generalTypes';

export default class UserController extends Component<{}, IUserControllerState> {
  constructor(props:{}) {
    super(props);
    this.state = {
      api: new ApiServices('http://localhost:8080'),
    };
  }

  async login(data:ICredentials):Promise<IPostData|Error> {
    try {
      // eslint-disable-next-line react/destructuring-assignment
      const tokens = await this.state.api.post('/api/auth/login', {
        email: data.email,
        password: data.password,
      });
      const { accessToken, refreshToken } = tokens as IPostData;

      if (accessToken && refreshToken) {
        return tokens as IPostData;
      }
      return new Error('Wrong credentials');
    } catch (error:any) {
      return new Error(error.message);
    }
  }

  async register(data:ICredentials):Promise<Error|string> {
    try {
      // eslint-disable-next-line react/destructuring-assignment
      this.state.api.post('/api/user', {
        email: data.email,
        password: data.password,
      });

      return `User "${data.email}" was added!`;
    } catch (error:any) {
      return new Error(error.message);
    }
  }

  async authentification(data:ICredentials):Promise<IPostData|Error|string|void> {
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
      return `user ${data.email} is registered. Please login!`;
    }
    return undefined;
  }

  async isLoggedIn(email:string):Promise<Boolean|Error> {
    const { api } = this.state;
    try {
      const user = await api.getUser(email) as IUser;
      return !!user.userId;
    } catch (error:any) {
      return new Error(error.message);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validateEmail(email:string):Boolean {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return reg.test(String(email).toLowerCase());
  }
}
