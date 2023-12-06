FROM golang:alpine

WORKDIR /Migrate

# Install curl and migrate tool
RUN apk add --no-cache curl && \
    curl -L https://github.com/golang-migrate/migrate/releases/download/v4.16.2/migrate.linux-amd64.tar.gz | tar xvz && \
    mv migrate.linux-amd64 migrate && \
    chmod +x migrate  # Ensure the migrate binary is executable

COPY 001_initial.down.sql 001_initial.up.sql ./

# Run down migration during the build process
RUN ./migrate -database "postgres://postgres:helloworld@db:5432/postgres?sslmode=disable" -path backend/Migrations/ down

# Run up migration when the container starts
CMD ./migrate -database "postgres://postgres:helloworld@db:5432/postgres?sslmode=disable" -path backend/Migrations/ up
