const express = require('express');
const sql = require('./utils/sql');
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());

// CORS policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


/****** Login ******/

// POST /identify
app.post("/identify", function (req, res) {
    var login = req.body.login;
    var passwd = req.body.passwd;
    var response;
    if (login === "admin" && passwd == "admin") {
      response = {ok: 1};
      console.log("Authentication accepted");
    } else {
      response = {ok: 0};
      console.log("Authentication rejected");
    }
    httpResponse(res, response);
});


/****** Users ******/

// GET /users
app.get("/users", function(req, res) {
    var sqlRequest = "SELECT id, firstname, lastname, birthdate FROM person";
    returnSQLResult(res, sqlRequest);
});

// GET /user?id=
app.get("/user", function(req, res) {
	var values = [req.query.id];
	var sqlRequest = "SELECT * FROM person WHERE id=$1";
	returnSQLResult(res, sqlRequest, values);
});

// PUT /user (containing an id) → updates the user
app.put("/user", function(req, res) {
	var values = [req.body.id, req.body.firstname, req.body.lastname, req.body.birthdate];
	var sqlRequest = "UPDATE person SET firstname=$2, lastname=$3, birthdate=$4  WHERE id=$1  RETURNING id";
	returnSQLResult(res, sqlRequest, values);
});

// POST /user (without id) → creates a new user
app.post("/user", function(req, res) {
	var values = [req.body.firstname, req.body.lastname, req.body.birthdate];
	var sqlRequest = "INSERT INTO person(firstname, lastname, birthdate)  VALUES ($1, $2, $3)  RETURNING id";
	returnSQLResult(res, sqlRequest, values);
});

// DELETE /user?id=
app.delete("/user", function(req, res) {
    var values = [req.query.id]
    var sqlRequest = "DELETE FROM person  WHERE id=$1"
    returnSQLResult(res, sqlRequest, values);
})


/****** Books ******/

// GET /books
app.get("/books", function(req, res) {
    var sqlRequest = "SELECT id, title, authors, available FROM book";
    returnSQLResult(res, sqlRequest);
});

// GET /book?id=
app.get("/book", function(req, res) {
	var values = [req.query.id];
	var sqlRequest = "SELECT id, title, authors, available FROM book  WHERE id=$1";
	returnSQLResult(res, sqlRequest, values);
});

// PUT /book (containing an id) → updates the book
app.put("/book", function(req, res) {
	var values = [req.body.id, req.body.title, req.body.authors];
	var sqlRequest = "UPDATE book SET title=$2, authors=$3  WHERE id=$1  RETURNING id";
	returnSQLResult(res, sqlRequest, values);
});

// PUT /book/available (containing an id) → makes the book available again
app.put("/book/available", function(req, res) {
	var values = [req.body.id];
	var sqlRequest = "UPDATE book SET available=1  WHERE id=$1  RETURNING id";
	returnSQLResult(res, sqlRequest, values);
});

// POST /book (without id) → creates a new book
app.post("/book", function(req, res) {
	var values = [req.body.title, req.body.authors];
	var sqlRequest = "INSERT INTO book(title, authors)  VALUES ($1, $2)  RETURNING id";
	returnSQLResult(res, sqlRequest, values);
});

// DELETE /book?id=
app.delete("/book", function(req, res) {
    var values = [req.query.id]
    var sqlRequest = "UPDATE book SET available=0  WHERE id=$1  RETURNING id"
    returnSQLResult(res, sqlRequest, values);
});


/****** Borrows ******/

// GET /borrows?user_id=
app.get("/borrows", function(req, res) {
	var values = [req.query.user_id];
	var sqlRequest = "SELECT borrow.id, book_id, borrow_date, return_date, title "
                   + "FROM borrow, book  WHERE book.id=book_id AND person_id=$1 "
                   + "ORDER BY return_date, borrow_date"
	returnSQLResult(res, sqlRequest, values);
});

// POST /borrow (without id) → creates a new borrow
app.post("/borrow", function(req, res) {
	var values = [req.body.person_id, req.body.book_id, req.body.borrow_date];
	var sqlRequest = "INSERT INTO borrow(person_id, book_id, borrow_date)  VALUES ($1, $2, $3)  RETURNING id";
	returnSQLResult(res, sqlRequest, values);
});

// PUT /borrow (with id) → udpates the return date of an existing borrow
app.put("/borrow", function(req, res) {
	var values = [req.body.return_date, req.body.id];
	var sqlRequest = "UPDATE borrow SET return_date=$1  WHERE id=$2  RETURNING id";
	returnSQLResult(res, sqlRequest, values);
});


/**
 * Makes the sqlRequest and returns the result to the http response
 */
function returnSQLResult(httpRes, sqlRequest, values=[]) {
    sql.request(sqlRequest, values).then(results => {
        httpResponse(httpRes, results);
    }).catch(error => {
        httpRes.status(500).end(error);
    })
}

/**
 * Makes a json http response
 */
function httpResponse(res, json) {
    var jsonString = JSON.stringify(json);
    res.setHeader("Content-Type", "application/json");
    res.send(jsonString);
}


// Starts the server
app.listen(8000, () => {
    console.log('Library server started');
});