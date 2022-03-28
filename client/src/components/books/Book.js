import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BookService } from "../../services/RestService";
import Books from "./Books";

export default class Book extends Component {

    constructor(props) {
        super(props);
        this.reAdd = this.reAdd.bind(this);
    }

    reAdd() {
        BookService.reAdd(this.props.book.id).then(() => Books.reloadBooks());
    }

    render() {
        let book = this.props.book;
        let editTooltip = book.available ? "Edit" : "You cannot edit unavailable books";
        let deleteTooltip = "This book will be unavailable";
        let reAddTooltip = "This book will be available again";
        var lastButtonLine = book.available===1 ?
            <Link to={"/books/delete/" + book.id}><button className="delete" title={deleteTooltip}>delete</button></Link> :
            <button className="validate" title={reAddTooltip} onClick={this.reAdd}>re-add</button>
        return (
            <tr>
                <td className="fit-content">{book.id}</td>
                <td>{book.title}</td>
                <td className="hidden-if-needed-850">{book.authors}</td>
                <td className="fit-content hidden-if-needed-650">{book.available ? "Available" : "Unavailable"}</td>
                <td className="fit-content">
                    <Link to={"/books/edit/" + book.id}> <button className="edit" disabled={book.available===0} title={editTooltip}>edit</button> </Link>
                    {lastButtonLine}
                </td>
            </tr>
        );
    }
}