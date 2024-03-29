import { Component } from 'react'
import { Context } from '../Context'
import ApiServices from '../Model/apiServices'
import { getState } from '../redux/store'
import { IUserControllerState, ICredentials, IUser } from '../types/authTypes'
import { IPostData } from '../types/generalTypes'

export default class UserController extends Component<{}, IUserControllerState> {
  static contextType = Context

  constructor(props: {}) {
    super(props)
    this.state = {
      api: new ApiServices('http://localhost:8080'),
    }
  }

  authentification = async (data: ICredentials): Promise<IPostData | Error | string | void> => {
    try {
      const messageEmptyFields = 'Please, enter your email and password'
      const messageValidateEmail = 'Please, enter email using the following pattern: xxxx@xxx.xx'
      const messagePasswordLength = 'Please lengthen this text to 6 characters or more'
      const { email, password } = data
      const isLoggedIn = await this.isLoggedIn(email)

      if (data.email === '' || data.password === '') {
        return new Error(messageEmptyFields)
      }
      if (!this.validateEmail(email)) {
        return new Error(messageValidateEmail)
      }
      if (data.password.length < 6) {
        return new Error(messagePasswordLength)
      }
      if (isLoggedIn === true) {
        const tokens = await this.login({ email, password })
        return tokens
      }
      if (isLoggedIn === false) {
        await this.register({ email, password })
        return `user ${email} is registered. Please login!`
      }
      return undefined
    } catch (error: any) {
      return new Error(error)
    }
  }

  async login(data: ICredentials): Promise<IPostData | Error> {
    try {
      const { email, password } = data
      const { api } = this.state
      const { isLoggedIn } = getState()

      const { post } = api
      const tokens = await post('/api/auth/login', {
        email,
        password,
      })
      const { accessToken, refreshToken } = tokens as IPostData

      if (accessToken && refreshToken) {
        return { ...(tokens as IPostData), isLoggedIn: !isLoggedIn }
      }
      return new Error('Wrong credentials')
    } catch (error: any) {
      return new Error(error.message)
    }
  }

  async register(data: ICredentials): Promise<Error | string> {
    try {
      const { api } = this.state
      const { post } = api
      post('/api/user', {
        email: data.email,
        password: data.password,
      })

      return `User "${data.email}" was added!`
    } catch (error: any) {
      return new Error(error.message)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validateEmail(email: string): Boolean {
    // eslint-disable-next-line operator-linebreak
    const reg =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return reg.test(String(email).toLowerCase())
  }

  async isLoggedIn(email: string): Promise<Boolean | Error> {
    const { api } = this.state
    const { getUser } = api
    try {
      const user = (await getUser(email)) as IUser
      return !!user.userId
    } catch (error: any) {
      return new Error(error.message)
    }
  }
}
