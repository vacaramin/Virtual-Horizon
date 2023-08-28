package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestSignup(t *testing.T) {
	// Initialize a new Gin router
	router := gin.Default()

	// Define a route for the Signup function
	router.POST("/signup", Signup)

	// Create a request body
	requestBody := map[string]interface{}{
		"Email":    "test@example.com",
		"Password": "test123",
		// Add other required fields
	}

	// Convert the request body to JSON
	jsonBody, _ := json.Marshal(requestBody)

	// Create a POST request with the JSON body
	req, _ := http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	// Create a response recorder to record the response
	rec := httptest.NewRecorder()

	// Serve the request
	router.ServeHTTP(rec, req)

	// Assert the HTTP status code
	assert.Equal(t, http.StatusOK, rec.Code)

	// Parse the response JSON
	var response map[string]interface{}
	_ = json.Unmarshal(rec.Body.Bytes(), &response)

	// Assert the response message or data
	assert.Equal(t, "User created successfully", response["message"])
}
