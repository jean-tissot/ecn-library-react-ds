h help default:
	@echo "Use : make [action]" \
	&& echo "Actions:" \
	&& echo " → database_create (alias dc): (re)creates and starts the database" \
	&& echo " → database_up (alias du): starts the database (without creating it again)" \
	&& echo " → database_down (alias dd): stops the database without destroying it" \
	&& echo " → server_set (alias ss): installs the server dependencies" \
	&& echo " → server_up (alias su): starts the server" \
	&& echo " → backend_up (alias bu): starts the database and the server" \
	&& echo " → client_set (alias cs): installs the client dependencies" \
	&& echo " → client_up (alias cu): serves the client on http://localhost:3000" \
	&& echo " → client_build (alias cb): builds the client for prod" \
	&& echo " → client_serve_built (alias csb): serves the built client"

client_set cs:
	@echo "Installing client dependencies..." \
		&& cd client && npm install -n

client_up cu:
	@echo "Serving library client on http://localhost:3000..." \
		&& cd client && npm start


client_build cb:
	@echo "Building library client (in the client/build directory)..." \
		&& cd client && npm run build

client_serve_built csb:
	@echo "Serving the built client..." \
		&& cd client && serve -s build

server_set ss:
	@echo "Installing server dependencies..." \
		&& cd server && npm install

server_up su:
	@echo "Serving library server on http://localhost:8000..." \
		&& cd server && npm start

database_create dc:
	@echo "Creating and starting the database... You can access to it via pgadmin at http://localhost:15432 (id: admin@pgadmin.com, password: password)" \
		&& cd database && docker-compose down \
		&& docker-compose up -d \
		&& docker exec -it -u root tp-library-pgadmin cp /tmp/pgpass.conf /pgadmin4 \
		&& docker exec -it -u root tp-library-pgadmin chown pgadmin:pgadmin /pgadmin4/pgpass.conf \
		&& docker exec -it -u root tp-library-pgadmin chmod 600 /pgadmin4/pgpass.conf

database_up du:
	@echo "Starting the database... You can access to pgadmin at http://localhost:15432 (id: admin@pgadmin.com, password: password)" \
		&& cd database && docker-compose start

database_down dd:
	@echo "Stopping the database..." \
		&& cd database && docker-compose stop

backend_up bu: du su