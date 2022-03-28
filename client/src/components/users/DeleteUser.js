import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserService } from "../../services/RestService";
import Users from "./Users";

class DeleteUser extends Component{

    constructor(props) {
        super(props);
        this.state = {firstname: "", lastname: "", editFinished: false}
        this.deleteUser = this.deleteUser.bind(this);
        this.close = this.close.bind(this);

        UserService.getUser(props.id).then(user => {
            this.setState({firstname : user.firstname});
            this.setState({lastname: user.lastname});
        }).catch(error => console.error(error));
    }

    deleteUser(event) {
        event.preventDefault();
        console.log("Deleting the user...")
        UserService.deleteUser(this.props.id).then(() => {
            console.log("User deleted.")
            Users.reloadUsers();
            this.close();
        });
    }

    close() {
        this.setState({editFinished: true});
    }

    render() {
        if(this.state.editFinished) {
            return(<Navigate to="/users" />)
        }
        return (
            <div className="modal-background">
                <div className="modal-popup">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h1>Delete the user ?</h1>
                    <div className="center-content">
                        <span className="background-colored padding">User (#{this.props.id}) : {this.state.firstname} {this.state.lastname}</span>
                    </div>
                    <div className="center-content space-top">
                        <button className="validate" onClick={this.close} autoFocus>Cancel</button>
                        <button className="delete" onClick={this.deleteUser}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default (props) => (<DeleteUser {...props} id={useParams().id} />);