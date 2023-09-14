package controllers

import (
	"Virtual-Horizon/initializers"
	studentmodel "Virtual-Horizon/src/student/models"
	usermodel "Virtual-Horizon/src/user/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

// SignupStudent This function takes in request body with information of a Student Profile and adds a User to the Database, and returns a jwt token
func SignupStudent(c *gin.Context) {
	fmt.Println("Signup_student")
	var body struct {
		Email               string
		Password            string
		Name                string
		Dob                 string
		Gender              usermodel.Gender
		About               string
		ParentGuardianName  string
		ParentGuardianEmail string
		ParentGuardianPhone string
		GradeLevel          string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	// Check if the email already exists in the database
	var existingUser usermodel.User
	result := initializers.DB.Where("email = ?", body.Email).First(&existingUser)
	if result.RowsAffected > 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "fail",
			"msg":    "Email already exists",
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
	// Create User Model
	user := usermodel.User{
		Email:    body.Email,
		Password: string(hash),
		Name:     body.Name,
		Dob:      body.Dob,
		Gender:   body.Gender,
		Role:     "student", // Set role to "student" for a student signup
		About:    body.About,
	}
	err = user.Validate()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "fail",
			"msg":    "Bad request, Please check for correct Validation, i.e email",
			"error":  err,
		})
		return
	}
	initializers.DB.Create(&user)

	// Create a student
	student := studentmodel.Student{
		User:                user,
		ParentGuardianName:  body.ParentGuardianName,
		ParentGuardianEmail: body.ParentGuardianEmail,
		ParentGuardianPhone: body.ParentGuardianPhone,
		GradeLevel:          body.GradeLevel,
	}
	initializers.DB.Create(&student)

	// Return the response
	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
	})
}
func GetWelcomeMessage(c *gin.Context) {

}
