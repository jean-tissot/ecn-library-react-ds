import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserService } from "../../services/RestService";
import withTimeZone from "../../utils/date";
import { reloadUserInProfile } from "./UserProfile";
import Users from "./Users";

class EditUser extends Component{

    constructor(props) {

        super(props);

        console.log("edit user")

        this.state = {firstname: "", lastname: "", birthdate: new Date(), editFinished: false}

        this.setFirstname = this.setFirstname.bind(this);
        this.setLastname = this.setLastname.bind(this);
        this.setBirthdate = this.setBirthdate.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.close = this.close.bind(this);
        
        if(props.id) {
            UserService.getUser(props.id).then(user => {
                this.setState({firstname : user.firstname});
                this.setState({lastname: user.lastname});
                this.setState({birthdate: new Date(user.birthdate)});
            }).catch(error => console.error(error));
        }
    }

    setFirstname(event) {
        this.setState({firstname: event.target.value});
    }

    setLastname(event) {
        this.setState({lastname: event.target.value});
    }

    setBirthdate(event) {
        this.setState({birthdate: new Date(event.target.value)});
    }

    saveUser(event) {
        event.preventDefault();
        console.log("Saving the user...")
        UserService.createOrUpdate({
            id: this.props.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthdate: withTimeZone(this.state.birthdate)
        }).then(() => {
            console.log("User saved.")
            Users.reloadUsers();
            reloadUserInProfile();
            this.close();
        });
    }

    close() {
        this.setState({editFinished: true});
    }

    getIdLine() {
        if(this.props.id) {
            return (
                <td>{this.props.id}</td>
            )
        } else {
            return;
        }
    }

    render() {
        if(this.state.editFinished) {
            return(<Navigate to={this.props.redirect} />)
        }
        var idLine;
        if(this.props.id) {
            idLine = <tr><th>User #</th><td>{this.props.id}</td></tr>;
        }
        return (
            <div className="modal-background">
                <div className="modal-popup">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h1>Edit the user</h1>
                    <form onSubmit={this.saveUser}>
                        <table>
                            <tbody>
                                {idLine}
                                <tr>
                                    <th>Firstname</th>
                                    <td><input type="text" name="Firstname" autoFocus
                                        value={this.state.firstname}
                                        onChange={this.setFirstname} /></td>
                                </tr>
                                <tr>
                                    <th>Lastname</th>
                                    <td><input type="text" name="Lastname"
                                        value={this.state.lastname}
                                        onChange={this.setLastname} /></td>
                                </tr>
                                <tr>
                                    <th>Birthdate</th>
                                    <td><input type="date" name="Birthdate"
                                        value={this.state.birthdate.toLocaleDateString('en-CA')}
                                        onChange={this.setBirthdate} /></td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <div className="center-content">
                                            <button type="submit" className="validate">Save</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        )
    }
}

const EditUserFromList = (props) => (<EditUser {...props} id={useParams().id} redirect="/users" />);
const EditUserFromProfile = (props) => (<EditUser {...props} id={useParams().id} redirect=".." />);

export { EditUserFromList, EditUserFromProfile };
