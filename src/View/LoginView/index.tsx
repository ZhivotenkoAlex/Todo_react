import React, { Component } from 'react';
import Button from '../../Components/Button/index.jsx';
import Container from '../../Components/Container/index.jsx';
import TextInput from '../../Components/TextInput/index.jsx';
import s from './LoginView.module.css';
import UserController from '../../Controller/userController.jsx';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.user = new UserController();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { getStatus } = this.props;
    try {
      this.user.authentification(this.state)
        .then((res) => {
          if (res instanceof Error) {
            console.log(res.message);
            return null;
          }
          getStatus(res);
          return null;
        })
        .catch((error) => { console.log(error); });
    } catch (error) {
      console.log(error);
    }
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <form className = {s.form} onSubmit = {(e) => this.handleSubmit(e)}>
          <h1 className = {s.title}>Login...</h1>
          <TextInput placeholder = "email" name = "email" value = {email} onChange = {(e) => this.onChange(e)} type = "text" />
          <TextInput placeholder = "password" name = "password" value = {password} onChange = {(e) => this.onChange(e)} type = "password" />
          <Button value = "Login" />
        </form>
      </Container>
    );
  }
}

export default LoginView;
