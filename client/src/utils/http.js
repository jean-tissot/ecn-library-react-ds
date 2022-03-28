let apiUrl = "http://localhost:8000"

function request(method, endpoint, params, useBody=true) {
    var url = apiUrl + "/" + endpoint
    if(!useBody) {
        url += "?" + new URLSearchParams(params).toString();
    } 
    return new Promise((resolve, reject) => {
        // We makes the POST request to the endpoint, with the params as json body
        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: useBody ? JSON.stringify(params) : undefined
        })
        // Then we return the json response as an object or the error if applicable
        .then(response => {
            response.json().then(data => {
                resolve(data);
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    });
}

function GET(endpoint, params) {
    return request('GET', endpoint, params, false);
}

function POST(endpoint, params) {
    return request('POST', endpoint, params);
}

function PUT(endpoint, params) {
    return request('PUT', endpoint, params);
}

function DELETE(endpoint, params) {
    return request('DELETE', endpoint, params, false);
}

export { GET, POST, PUT, DELETE };
