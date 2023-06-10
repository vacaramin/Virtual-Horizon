db:
	sudo service postgresql start

frontend:
	cd frontend && npm start

backend:
	cd backend && go run main.go


.PHONY: frontend backend db
