import React, { Component } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Books from "./components/books/Books.js";
import DeleteBook from "./components/books/DeleteBook.js";
import EditBook from "./components/books/EditBook.js";
import EditBorrow from "./components/borrows/EditBorrow.js";
import Login from "./components/login/Login.js";
import DeleteUser from "./components/users/DeleteUser.js";
import { EditUserFromList, EditUserFromProfile } from "./components/users/EditUser.js";
import { UserProfile } from "./components/users/UserProfile.js";
import Users from "./components/users/Users.js";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString);
}

function removeToken() {
    sessionStorage.removeItem('token');
}

class App extends Component {
    render() {
        return (
          <div>
            <ul>
                <li><Link to="/">-- Welcome --</Link></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/books">Books</NavLink></li>
            </ul>
            <div className="app-container">
            <Routes>
                <Route path="/" element={<Login setToken={setToken} removeToken={removeToken} />}></Route>
                <Route path="/users" element={<Users getToken={getToken} />}>
                    <Route path="/users/edit/:id" element={<EditUserFromList getToken={getToken} />}></Route>
                    <Route path="/users/delete/:id" element={<DeleteUser getToken={getToken} />}></Route>
                    <Route path="/users/add" element={<EditUserFromList getToken={getToken} />}></Route>
                </Route>
                <Route path="/user/:id" element={<UserProfile getToken={getToken} />}>
                    <Route path="/user/:id/edit" element={<EditUserFromProfile getToken={getToken} />}></Route>
                    <Route path="/user/:id/borrow" element={<EditBorrow getToken={getToken} />}></Route>
                </Route>
                <Route path="/books" element={<Books getToken={getToken} />}>
                    <Route path="/books/edit/:id" element={<EditBook getToken={getToken} />}></Route>
                    <Route path="/books/delete/:id" element={<DeleteBook getToken={getToken} />}></Route>
                    <Route path="/books/add" element={<EditBook getToken={getToken} />}></Route>
                </Route>
            </Routes>
          </div>
        </div>
        );
    }
}

export default App;