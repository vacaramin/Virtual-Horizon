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

migrate-up-force:
	migrate -database "postgres://postgres:helloworld@localhost:5432/postgres" -path backend/Migrations/ -verbose up 

migrate-down-force:
	migrate -database "postgres://postgres:helloworld@localhost:5432/postgres" -path backend/Migrations/ -verbose down 

migrate-fix:
	migrate -database "postgres://postgres:helloworld@localhost:5432/postgres" -path backend/Migrations/ force 1

.PHONY: frontend backend db migrate-up migrate-down migrate-up-force migrate-down-force
