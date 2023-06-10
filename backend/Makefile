db-start:
	sudo service postgresql start

db-stop:
	sudo service postgresql stop

db-restart:
	sudo service postgresql restart

db-status:
	sudo service postgresql status

start-server:
	go run main.go

migrate-up:
	migrate -database "postgres://admin:helloworld@localhost:5432/postgres" -path Migrations/ up

migrate-down:
	migrate -database "postgres://admin:helloworld@localhost:5432/postgres" -path Migrations/ down

.PHONY: db-start db-stop db-restart db-status start-server migrate-up migrate-down