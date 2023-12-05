# Stage 1: Build the application
FROM golang:alpine AS builder

WORKDIR /apiServer

COPY go.mod go.sum ./
RUN go mod download


COPY . .
RUN go build -o main

# Stage 2: Create a minimal image with only the necessary artifacts
FROM alpine:latest

WORKDIR /app

COPY --from=builder /apiServer/main .
COPY --from=builder /apiServer/.env .

CMD ["./main"]
