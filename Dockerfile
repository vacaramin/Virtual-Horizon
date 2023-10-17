# TO DO
#   A. Frontend
#       1. Node Installation
#       2. Running npm install script
#       3. Running the application
#       4. expose localhost:3000
#   B. PostGresql
#       1. Postgresql Image pull
#       2. Set env variables, to add database
#       3. Run Migrations
#       4. Expose port for the backend
#   C.  Go
#       1. Go Image Pull
#       2. Run Scripts
#       3. Install Go-lang Migrate
#       4. Build Application
#       
#   D.  Alpine
#       1. Run the Builds
#   
From golang:alpine

WORKDIR /backend
ADD ./backend .

RUN go build main.go

ENTRYPOINT [ "go run" ]
CMD [ "main" ]
