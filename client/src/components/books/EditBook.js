import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BookService } from "../../services/RestService";
import Books from "./Books";

class EditBook extends Component{

    constructor(props) {

        super(props);

        this.state = {title: "", authors: "", editFinished: false}

        this.setTitle = this.setTitle.bind(this);
        this.setAuthors = this.setAuthors.bind(this);
        this.saveBook = this.saveBook.bind(this);
        this.close = this.close.bind(this);
        
        if(props.id) {
            BookService.getBook(props.id).then(book => {
                this.setState({title : book.title});
                this.setState({authors: book.authors});
            }).catch(error => console.error(error));
        }
    }

    setTitle(event) {
        this.setState({title: event.target.value});
    }

    setAuthors(event) {
        this.setState({authors: event.target.value});
    }

    saveBook(event) {
        event.preventDefault();
        console.log("Saving the book...")
        BookService.createOrUpdate({
            id: this.props.id,
            title: this.state.title,
            authors: this.state.authors,
        }).then(() => {
            console.log("Book saved.")
            Books.reloadBooks();
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
            return(<Navigate to="/books" />)
        }
        var idLine;
        if(this.props.id) {
            idLine = <tr><th>Book #</th><td>{this.props.id}</td></tr>;
        }
        return (
            <div className="modal-background">
                <div className="modal-popup">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h1>Edit the book</h1>
                    <form onSubmit={this.saveBook}>
                        <table>
                            <tbody>
                                {idLine}
                                <tr>
                                    <th>Title</th>
                                    <td><input type="text" name="Title" autoFocus
                                        value={this.state.title}
                                        onChange={this.setTitle} /></td>
                                </tr>
                                <tr>
                                    <th>Authors</th>
                                    <td><input type="text" name="Authors"
                                        value={this.state.authors}
                                        onChange={this.setAuthors} /></td>
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

export default (props) => (<EditBook {...props} id={useParams().id} />);