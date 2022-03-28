import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Book extends Component {

    render() {
        let book = this.props.book;
        let editTooltip = book.available ? "Edit" : "You cannot edit unavailable books";
        let deleteTooltip = "This book will be unavailable";
        let reAddTooltip = "This book will be available again";
        var lastButtonLine = book.available===1 ?
            <Link to={"/books/delete/" + book.id}><button className="delete" title={deleteTooltip}>delete</button></Link> :
            <button className="validate" title={reAddTooltip}>re-add</button>
        return (
            <tr>
                <td className="fit-content">{book.id}</td>
                <td>{book.title}</td>
                <td className="hidden-if-needed">{book.authors}</td>
                <td className="fit-content">{book.available ? "Available" : "Unavailable"}</td>
                <td className="fit-content">
                    <Link to={"/books/edit/" + book.id}> <button className="edit" disabled={book.available===0} title={editTooltip}>edit</button> </Link>
                    {lastButtonLine}
                </td>
            </tr>
        );
    }
}