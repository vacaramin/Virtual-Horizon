start-db:
	sudo service postgresql start

start-frontend:
	cd frontend && npm start

start-server:
	cd backend && go run main.go


.PHONY: start-frontend start-backend start-db
