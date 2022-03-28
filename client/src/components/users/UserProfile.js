import React, { Component } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { UserService } from "../../services/RestService";
import Borrow from "../borrows/Borrow";

class UserProfileToExport extends Component {

  static reloadUser() {
    if(UserProfileToExport.instance) {
      UserProfileToExport.instance.loadUser();
    }
  }

  static reloadBorrows() {
    if(UserProfileToExport.instance) {
      UserProfileToExport.instance.loadBorrows();
    }
  }

  static instance;

  constructor(props) {
    super(props);
    UserProfileToExport.instance = this;
    this.state = { firstname: "", lastname: "", birthdate: new Date(), borrows: []};
    this.load = this.loadUser.bind(this);

    if (props.id) {
      this.loadUser();
      this.loadBorrows();
    }
  }

  loadUser() {
    UserService.getUser(this.props.id)
        .then((user) => {
          this.setState({ firstname: user.firstname });
          this.setState({ lastname: user.lastname });
          this.setState({ birthdate: new Date(user.birthdate) });
        })
        .catch((error) => console.error(error));
  }

  loadBorrows() {
    UserService.getBorrows(this.props.id)
        .then((borrows) => this.setState({borrows: borrows}))
        .catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
        <div className="app">
          <div className="split-content">

            <div>
              <table>

                <thead>
                  <tr>
                    <td colSpan="2"><h1>User profile (#{this.props.id})</h1></td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>Firstname</th><td>{this.state.firstname}</td>
                  </tr>
                  <tr>
                    <th>Lastname</th><td>{this.state.lastname}</td>
                  </tr>
                  <tr>
                    <th>Birthdate</th><td>{this.state.birthdate.toLocaleDateString()}</td>
                  </tr>
                </tbody>

              </table>
              <Link to="edit"><button className="edit bottom-button">Edit</button></Link>
            </div>

            <div>
              <table>

                <thead>
                  <tr>
                    <td colSpan="4"><h1>Borrows of the user (#{this.props.id})</h1></td>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th>Book title</th>
                    <th className="hidden-if-needed">Borrow date</th>
                    <th>Return date</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.borrows.map(borrow => <Borrow borrow={borrow} key={borrow.id}/>)}
                </tbody>

              </table>
              <Link to="borrow"><button className="validate bottom-button">Add</button></Link>
            </div>

          </div>
        </div>
    
      {/* The outlet for the edit and add popus */}
      <Outlet/>
    
      </div>
    );
  }
}

const UserProfile = (props) => <UserProfileToExport {...props} id={useParams().id} />;
const reloadUserInProfile = () => UserProfileToExport.reloadUser();
const reloadBorrowsInProfile = UserProfileToExport.reloadBorrows;

export { UserProfile, reloadUserInProfile, reloadBorrowsInProfile };

