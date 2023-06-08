package controllers

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	fmt.Println("Signup")
	var body struct {
		Email    string
		Password string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	//Hash the body
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error while hashing the password",
		})
		return
	}
	//Create a user
	user := models.User{
		Email:    body.Email,
		Password: string(hash),
	}
	//Save the user
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error while creating the user",
		})
		return
	}

	//return the response
	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
	})

}
