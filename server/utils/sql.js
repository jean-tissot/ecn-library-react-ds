const pg = require('pg');

var dbUrl = 'postgres://postgres:password@localhost:5432/postgres'

function request(sqlRequest, values=[]) {
    var client = new pg.Client(dbUrl);
    return new Promise((resolve, reject) => client.connect(function(err) {
            if(err) {
                console.log("Cannot connect to postgres", err);
                reject("Database connection error");
            } else {
                client.query(sqlRequest, values, function(error, result){
                    if(error) {
                        console.log("Bad sql request", error);
                        reject("Bad sql request");
                    } else {
                        var results = [];
                        for (var index in result.rows) {
                            results.push(result.rows[index])
                        }
                        resolve(results);
                    }
                    client.end();
                })
            }
        })
    );
}

module.exports = { request }