# TO DO
#   A. Frontend
#       1. Node Installation
#       2. Running npm install script
#       3. Running the application
#       4. expose localhost:3000
#   Database, frontend, and Backend should run on 3 different containers over shared network
FROM golang:alpine

WORKDIR /apiServer

COPY . . 

RUN go build -o main

CMD ["./main"]
