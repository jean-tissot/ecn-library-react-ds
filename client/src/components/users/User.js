import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class User extends Component {

    render() {
        let user = this.props.user;
        return (
            <tr>
                <td className="fit-content">{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td className="hidden-if-needed">{new Date(user.birthdate).toLocaleDateString()}</td>
                <td className="fit-content">
                    <Link to={"/user/" + user.id} >
                        <button className="validate">profile</button>
                    </Link>
                    <Link to={"/users/edit/" + user.id} >
                        <button className="edit">edit</button>
                    </Link>
                    <Link to={"/users/delete/" + user.id} >
                        <button className="delete">delete</button>
                    </Link>
                </td>
            </tr>
        );
    }
}