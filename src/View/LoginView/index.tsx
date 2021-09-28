import React, { Component } from 'react'
import Button from '../../Components/Button'
import Container from '../../Components/Container'
import TextInput from '../../Components/TextInput'
import './LoginView.scss'
import UserController from '../../Controller/userController'
import { IState } from '../../types/authTypes'
import { ITokens } from '../../types/generalTypes'
import { dispatch } from '../../redux/store'
import { Context } from '../../Context'

class LoginView extends Component<{}, IState> {
  // eslint-disable-next-line react/static-property-placement
  static contextType = Context

  constructor(props: {}) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: new UserController({}),
      isLogin: false,
    }
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { email, password, user } = this.state
      const data = {
        email,
        password,
      }
      user
        .authentification(data)
        .then(res => {
          if (res instanceof Error) {
            console.log(res.message)
            return null
          }
          const { accessToken, refreshToken } = res as ITokens
          dispatch({
            type: 'GET_STATE',
            payload: {
              isLoggedIn: true,
              accessToken,
              refreshToken,
            },
          })
          return null
        })
        .then(this.context.toggleLog())
    } catch (error) {
      console.log(error)
    } finally {
      this.context.toggleLog()
    }
  }

  onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget
    this.setState(state => ({
      ...state,
      password: value,
    }))
  }

  onChangeEmail = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget
    this.setState(state => ({
      ...state,
      email: value,
    }))
  }

  render() {
    const { email, password } = this.state
    return (
      <Container>
        <form className="loginView__form" onSubmit={this.handleSubmit}>
          <h1 className="loginView__formtitle">Login...</h1>
          <TextInput
            placeholder="email"
            name="email"
            value={email}
            onChange={this.onChangeEmail}
            type="text"
          />
          <TextInput
            placeholder="password"
            name="password"
            value={password}
            onChange={this.onChangePassword}
            type="password"
          />
          <Button value="Login" />
        </form>
      </Container>
    )
  }
}

export default LoginView
