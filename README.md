# Library project

This project is an interface created with React to manage a library

## Running the project

To run this project you need to have `NodeJS` installed. After having installed _NodeJS_, make sure the `npm` command is available (if not, you will need to add it to the path).  
You also need `docker-compose` for the database.  
And you need `make` to be able to run all the following commands (from the root directory of the project)  

**To test the project quickly, run `make ss && make cs` to install dependencies, then run `make dc && make su` in one terminal, and `make cu` in another terminal.**
See the next sections for more details.
### Client

- Run `make cs` (or `make client_set`) to install the client dependencies
- Run `make cu` (or `make client_up`) to serve the client
- Run `make cb` (or `make client_build`) to build the client for production


If you want to serve the production built client, you can install the _serve_ npm package if you don't already have it on your machine (just run `npm install -g serve` and make sure the `serve` command is available, adding it to the path if neccesary). You can run `make csb` (or `make client_serve_built`) to serve it.

### Server

- Run `make ss` (or `make server_set`) to install the server dependencies
- Run `make su` (or `make server_up`) to serve the the server

### Database

You need to have _docker-compose_ (and _docker_) installed to start the database

The environment contains a _postgresql_ database and _pgadmin_.

- Run `make dc` (or `make database_create`) to create the environment (initialises the database and pgadmin). It may take a little time.
- Run `make dd` (or `make database_down`) to shutdown (without destroying) the database and pgadmin.
- Run `make du` (or `make database_up`) to start the database (if created)

To access pgadmin:  
Url: http://localhost:15432  
Identifiant: `admin@pgadmin.com`  
Password: `password`  
Database password (already saved in pgadmin): `password`

N.B: if the database is already created, you can use `make bu` (or `make backend_up`) to start the database and the server in one command.