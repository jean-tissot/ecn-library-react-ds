import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { POST } from "../../utils/http";
import './login.css';

export default class Login extends Component {

  static TOKEN = "abcdef";

  constructor(props) {
    super(props);
    this.state = { canLogin: false, login: "", pass: "" };
    // We give these methods the visibility to "this"
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  handleChangeLogin(event) {
    this.setState({ login: event.target.value });
  }

  handleChangePass(event) {
    this.setState({ pass: event.target.value });
  }

  checkLogin(event) {
    // We prevent the default action of this event, which is to reload the page
    event.preventDefault();
    const params = {login: this.state.login, passwd: this.state.pass};
    POST("identify", params).then(data => {
      if (data.ok === 1) {
        this.props.setToken(Login.TOKEN);
        console.log("User " + this.state.login + " connected");
        this.setState({ canLogin: true });
      }
    })
  }

  render() {
    if (this.state.canLogin) {
      return (<Navigate to='/users' />);
    }
    return (
      <form className="login" onSubmit={this.checkLogin}>
        <h1>Library Login</h1>

        <p>
          <input
            type="text"
            value={this.state.login}
            onChange={this.handleChangeLogin}
            placeholder="Login"
          />
        </p>

        <p>
          <input
            type="password"
            value={this.state.pass}
            onChange={this.handleChangePass}
            placeholder="Password"
          />
        </p>

        <p>
          <button type="submit" className="large">
            Login
          </button>
        </p>
      </form>
    );
  }
}
