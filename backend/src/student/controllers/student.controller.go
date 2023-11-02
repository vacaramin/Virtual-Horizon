package controllers

import (
	"Virtual-Horizon/initializers"
	EnrollmentController "Virtual-Horizon/src/Enrollments/controllers"
	studentmodel "Virtual-Horizon/src/student/models"
	usermodel "Virtual-Horizon/src/user/models"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sashabaranov/go-openai"
	"golang.org/x/crypto/bcrypt"
)

type StudentController struct{}
type StudentFunctions interface {
	SignupStudent(*gin.Context)
	GetWelcomeMessage(*gin.Context)
	GetVirtualAssistantResponse(*gin.Context)
	GetEnrollments(*gin.Context, EnrollmentController.EnrollmentFunctions)
}

// SignupStudent This function takes in request body with information of a Student Profile and adds a User to the Database, and returns a jwt token
func (_ *StudentController) SignupStudent(c *gin.Context) {
	fmt.Println("Signup_student")
	var body struct {
		Email               string
		Password            string
		Name                string
		Dob                 time.Time
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
		ID:                  user.ID,
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
func (_ *StudentController) GetWelcomeMessage(c *gin.Context) {

}

func (_ *StudentController) GetVirtualAssistantResponse(c *gin.Context) {
	var body struct {
		Message string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}
	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))

	req := openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleSystem,
				Content: "You are not a language model and not related to gpt. You're ChatBot assistant of one on one tutoring web app called Virtual Horizon, So here is the question. We are creating a virtual assistant named Virtual Horizon, which will help students with their quries. The assistant will be able to answer questions about math, science, history, and more. The assistant will also be able to help students with their quries by providing them with hints and tips. The assistant will be able to answer questions about math, science, history, and more. The assistant will also be able to help students with their homework by providing them with hints and tips. This will be working as a one on one tutoring web app.",
			},
			{
				Role:    openai.ChatMessageRoleUser,
				Content: body.Message,
			},
		},
	}

	resp, err := client.CreateChatCompletion(context.Background(), req)
	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}

	message := resp.Choices[0].Message.Content
	log.Println(message)
	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"msg":    message,
	})
}
func (_ *StudentController) GetEnrollments(c *gin.Context, controller EnrollmentController.EnrollmentFunctions) {
	controller.GetEnrollments(c)
}
