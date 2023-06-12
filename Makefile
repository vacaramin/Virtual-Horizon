db:
	sudo service postgresql start

frontend:
	cd frontend && npm start

backend:
	cd backend && go run main.go

migrate-up:
	migrate -database "postgres://postgres:helloworld@localhost:5432/postgres" -path backend/Migrations/ up

migrate-down:
	migrate -database "postgres://postgres:helloworld@localhost:5432/postgres" -path backend/Migrations/ down


.PHONY: frontend backend db migrate-up migrate-down
