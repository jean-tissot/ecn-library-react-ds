import React, { Component } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { UserService } from "../../services/RestService";
import Login from "../login/Login";
import '../table.css';
import User from "./User";


export default class Users extends Component {

  static reloadUsers() {
    if(Users.instance) {
      Users.instance.loadUsers();
    }
  }

  static instance;

  constructor(props) {
    super(props);
    this.state = {isLogged: props.getToken() === Login.TOKEN, users : []}
    this.loadUsers = this.loadUsers.bind(this);
    if(this.state.isLogged) {
      this.loadUsers();
      Users.instance = this;
    }
  }

  loadUsers() {
    UserService.loadUsers().then(users => {
      this.setState({users: users})
    });
  }


  render() {
    if (!this.state.isLogged) {
      return (<Navigate to='/' />)
    }
    return ( 
      <div>
        <div className="app">
          <table>

            <thead>
              <tr>
                <td colSpan="5">
                  <h1>List of users</h1>
                </td>
              </tr>
              <tr>
                <th>#</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th className="hidden-if-needed">Birthdate</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {this.state.users.map(user => <User user={user} key={user.id} />)}
            </tbody>

          </table>
          <Link to="add"><button className="validate bottom-button">Add User</button></Link>
        </div>

        {/* The outlet for the edit and add popups*/}
        <Outlet/>
        
      </div>
    );
  }
}
