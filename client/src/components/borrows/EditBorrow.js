import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BookService, UserService } from "../../services/RestService";
import { reloadBorrowsInProfile } from "../users/UserProfile";


class EditBorrow extends Component {

    constructor(props) {
        super(props);
        this.state = {books: [], chosenBookId: "", editFinished: false};
        this.setChosenBook = this.setChosenBook.bind(this);
        this.saveBorrow = this.saveBorrow.bind(this);
        this.close = this.close.bind(this);
        BookService.loadBooks().then(books => this.setState({books: books.filter(book => book.available===1)}));
    }

    setChosenBook(event) {
        this.setState({chosenBookId: event.target.value});
        console.log(this.state.chosenBookId)
    }

    saveBorrow() {
        UserService.createBorrow({person_id: this.props.userId, book_id: this.state.chosenBookId, borrow_date: new Date()})
            .then(() => {
                this.close();
                reloadBorrowsInProfile();
            });
    }

    close() {
        this.setState({editFinished: true});
    }

    render() {
        if(this.state.editFinished) {
            return(<Navigate to=".." />)
        }
        return (
            <div className="modal-background">
                <div className="modal-popup">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h1>Borrow a book</h1>
                    <div className="center-content">
                    <select onChange={this.setChosenBook}>
                        <option value="" className="option">Choose a book</option>
                        {this.state.books.map(book => 
                            <option value={book.id} key={book.id} >
                                {book.title}
                            </option>
                        )}
                    </select>
                    <button className="validate" onClick={this.saveBorrow} disabled={this.state.chosenBookId === ""}>borrow</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default (props) => (<EditBorrow {...props} userId={useParams().id} />);