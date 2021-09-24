import React, { Component } from 'react'
import Button from '../../Components/Button'
import Container from '../../Components/Container'
import TextInput from '../../Components/TextInput'
import './LoginView.scss'
import UserController from '../../Controller/userController'
import { ILoginPageProps, IState } from '../../types/authTypes'
import { ITokens } from '../../types/generalTypes'

class LoginView extends Component<ILoginPageProps, IState> {
  constructor(props: ILoginPageProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: new UserController({}),
    }
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { getStatus } = this.props
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
          getStatus(res as ITokens)
          return null
        })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  onChangePassword(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget
    this.setState(state => ({
      ...state,
      password: value,
    }))
  }

  onChangeEmail(e: React.FormEvent<HTMLInputElement>): void {
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
        <form className="loginView__form" onSubmit={e => this.handleSubmit(e)}>
          <h1 className="loginView__formtitle">Login...</h1>
          <TextInput placeholder="email" name="email" value={email} onChange={e => this.onChangeEmail(e)} type="text" />
          <TextInput
            placeholder="password"
            name="password"
            value={password}
            onChange={e => this.onChangePassword(e)}
            type="password"
          />
          <Button value="Login" />
        </form>
      </Container>
    )
  }
}

export default LoginView
