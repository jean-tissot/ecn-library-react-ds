import { DELETE, GET, POST, PUT } from "../utils/http";

/**
 * This class can be used as a static attribute to create a rest service for list of elements which can be loaded, created, updated and deleted
 */
class RestService {
    elements = undefined;

    constructor(endpoint) {
        this.endpoint = endpoint
    }

    getElements() {
        if(this.elements === undefined) {
            return this.loadElements();
        } else {
            return Promise.resolve(this.elements);
        }
    }
    
    loadElement(id) {
        console.log("loading " + this.endpoint + " " + id + " from server...")
        return new Promise((resolve, reject) => {
            GET(this.endpoint, {id: id}).then(elements => {
                resolve(elements[0]);
                console.log(this.endpoint + " " + id + " loaded.")
            }).catch(error => reject(error));
        });
    }

    createOrUpdate(element) {
        if(element.id) {
            return PUT(this.endpoint, element);
        } else {
            return POST(this.endpoint, element);
        }
    }

    deleteElement(id) {
        return DELETE(this.endpoint, {id: id});
    }

    _getElement(id, resolve, reject) {
        this.elements.forEach(element => {
            if(element.id.toString() === id) {
                resolve(element);
            }
        });
        reject("Unknown element (id: " + id + ")");
    }

    loadElements() {
        console.log("loading " + this.endpoint + "s from server...")
        return new Promise((resolve, reject) => {
            GET(this.endpoint + "s", {}).then(elements => {
                this.elements = elements
                resolve(elements);
                console.log(this.endpoint + "s loaded.")
            }).catch(error => reject(error));
        });
    }
}

class BookService {
    static restService = new RestService("book");

    static getBooks = () => this.restService.getElements();
    static getBook = (id) => this.restService.loadElement(id);
    static createOrUpdate = (book) => this.restService.createOrUpdate(book);
    static deleteBook = (id) => this.restService.deleteElement(id);
    static loadBooks = () => this.restService.loadElements();

    static reAdd(id) {
        return PUT("book/available", {id: id});
    }
    
}

class UserService {
    static restService = new RestService("user");

    static getUsers = () => this.restService.getElements();
    static getUser = (id) => this.restService.loadElement(id);
    static createOrUpdate = (user) => this.restService.createOrUpdate(user);
    static deleteUser = (id) => this.restService.deleteElement(id);
    static loadUsers = () => this.restService.loadElements();

    static getBorrows(userId) {
        console.log("Loading borrows of user " + userId + "from server ...");
        return new Promise((resolve, reject) => {
            GET("borrows", {user_id: userId}).then(elements => {
                resolve(elements);
                console.log("Borrows of user " + userId + " loaded.");
            }).catch(error => reject(error));
        });
    }

    static createBorrow(borrow) {
        return POST("borrow", borrow);
    }

    static returnBorrow(borrowId) {
        return PUT("borrow", {id: borrowId, return_date: new Date()});
    }
    
}

export { BookService, UserService };

