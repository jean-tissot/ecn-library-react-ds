import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Book extends Component {

    render() {
        let book = this.props.book;
        return (
            <tr>
                <td className="fit-content">{book.id}</td>
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td className="fit-content">
                    <Link to={"/books/edit/" + book.id} className="edit" >
                        <button className="edit">edit</button>
                    </Link>
                    <Link to={"/books/delete/" + book.id} className="edit" >
                        <button className="delete">delete</button>
                    </Link>
                </td>
            </tr>
        );
    }
}