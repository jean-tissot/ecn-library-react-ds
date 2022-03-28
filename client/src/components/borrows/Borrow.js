import React, { Component } from "react";
import { UserService } from "../../services/RestService";
import { reloadBorrowsInProfile } from "../users/UserProfile";

export default class Borrow extends Component {

    constructor(props) {
        super(props);
        this.return = this.return.bind(this);
    }

    return() {
        console.log(this.props.borrow)
        UserService.returnBorrow(this.props.borrow.id)
            .then(() => reloadBorrowsInProfile());
    }

    render() {
        let borrow = this.props.borrow;
        let return_line = borrow.return_date ? 
            new Date(borrow.return_date).toLocaleDateString() :
            <button className="edit" onClick={this.return}>return</button>
        return (
            <tr>
                <td className="fit-content">{borrow.id}</td>
                <td>{borrow.title}</td>
                <td className="hidden-if-needed">{new Date(borrow.borrow_date).toLocaleDateString()}</td>
                <td>{return_line}</td>
            </tr>
        )
    }
}