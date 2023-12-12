# Stage 1: Build the application
FROM golang:alpine3.19 AS builder

WORKDIR /apiServer

COPY go.mod .
COPY go.sum .

RUN go mod download

# Comment the CMD Below for multi stage build
CMD ["go", "run", "main.go"]
# Uncomment Below Lines for multi stage build
# RUN go build -o main

# # Stage 2: Create a minimal image with only the necessary artifacts
# FROM alpine:latest

# WORKDIR /app

# COPY --from=builder /apiServer/main .
# COPY --from=builder /apiServer/.env .


# CMD ["./main"]
