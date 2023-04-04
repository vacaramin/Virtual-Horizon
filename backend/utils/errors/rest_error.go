package errors

import "net/http"

type RestErr struct {
	Message string
	Status  int
	Error   string
}

func NewInteralServerError(message string) *RestErr {
	return &RestErr{
		Message: message,
		Status: http.StatusInternalServerError,
		Error: "internal_server_error"
	}
}

func NewBadRequestError(message string) *RestErr{
	return &RestErr{
		Message: message,
		Status: http.StatusBadRequest,
		Error: "Bad_request_error"
	}
}