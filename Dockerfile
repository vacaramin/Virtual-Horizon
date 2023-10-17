From golang:alpine

WORKDIR /backend
ADD ./backend .

RUN go build main.go

ENTRYPOINT [ "go run" ]
CMD [ "main" ]
