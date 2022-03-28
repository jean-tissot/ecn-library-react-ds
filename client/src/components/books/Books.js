import React, { Component } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { BookService } from "../../services/RestService";
import Login from "../login/Login";
import '../table.css';
import Book from "./Book";


export default class Books extends Component {

  static reloadBooks() {
    if(Books.instance) {
      Books.instance.loadBooks();
    }
  }

  static instance;

  constructor(props) {
    super(props);
    this.state = {isLogged: props.getToken() === Login.TOKEN, books : []}
    this.loadBooks = this.loadBooks.bind(this);
    if(this.state.isLogged) {
      this.loadBooks();
      Books.instance = this;
    }
  }

  loadBooks() {
    BookService.loadBooks().then(books => {
      this.setState({books: books})
    });
  }


  render() {
    if (!this.state.isLogged) {
      return (<Navigate to='/' />)
    }
    return ( 
      <div>
        <div className="app">
          <table>
            
            <thead>
              <tr>
                <td colSpan="5">
                  <h1>List of books</h1>
                </td>
              </tr>
              <tr>
                <th className="fit-content">#</th>
                <th>Title</th>
                <th className="hidden-if-needed-850">Authors</th>
                <th className="fit-content hidden-if-needed-650">Availability</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {this.state.books.map(book => <Book book={book} key={book.id} />)}
            </tbody>

          </table>
          <Link to="add"><button className="validate bottom-button">Add Book</button></Link>
        </div>
        <Outlet />
      </div>
    );
  }
}
