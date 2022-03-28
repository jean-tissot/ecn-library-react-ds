import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BookService } from "../../services/RestService";
import Books from "./Books";

class DeleteBook extends Component{

    constructor(props) {
        super(props);
        this.state = {title: "", authors: "", editFinished: false}
        this.deleteBook = this.deleteBook.bind(this);
        this.close = this.close.bind(this);

        BookService.getBook(props.id).then(book => {
            this.setState({title : book.title});
            this.setState({authors: book.authors});
        }).catch(error => console.error(error));
    }

    deleteBook(event) {
        event.preventDefault();
        console.log("Deleting the book...")
        BookService.deleteBook(this.props.id).then(() => {
            console.log("Book deleted.")
            Books.reloadBooks();
            this.close();
        });
    }

    close() {
        this.setState({editFinished: true});
    }

    render() {
        if(this.state.editFinished) {
            return(<Navigate to="/books" />)
        }
        return (
            <div className="modal-background">
                <div className="modal-popup">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h1>Delete the book ?</h1>
                    <div className="center-content">
                        <span className="background-colored padding">Book (#{this.props.id}) : {this.state.title} {this.state.authors}</span>
                    </div>
                    <div className="center-content space-top">
                        <button className="validate" onClick={this.close} autoFocus>Cancel</button>
                        <button className="delete" onClick={this.deleteBook}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default (props) => (<DeleteBook {...props} id={useParams().id} />);