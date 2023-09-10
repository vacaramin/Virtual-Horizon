package userControllers

import (
	"Virtual-Horizon/initializers"
	studentmodel "Virtual-Horizon/src/student/models"
	usermodel "Virtual-Horizon/src/user/models"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// Signup This function takes in request body with information of a Student Profile and adds a User to the Database, and returns a jwt token
func Signup(c *gin.Context) {
	fmt.Println("Signup")
	var body struct {
		Email               string
		Password            string
		Name                string
		Dob                 string
		Gender              string
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
		User: usermodel.User{
			Email:    body.Email,
			Password: string(hash),
			Name:     body.Name,
			Dob:      body.Dob,
			Gender:   body.Gender,
			Role:     "student", // Set role to "student" for a student signup
		},
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

// GetProfileByID This Function returns the user data based on the ID
func GetProfileByID(c *gin.Context) {
	idStr, _ := c.Params.Get("ID")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Println("Invalid ID")
		c.JSON(http.StatusNotFound, gin.H{
			"status": "fail",
			"msg":    "ID is not valid",
		})
		return
	}

	var user usermodel.User
	result := initializers.DB.First(&user, id)
	if result.Error != nil {
		log.Println("Error fetching user:", result.Error)
		c.JSON(http.StatusNotFound, gin.H{
			"status": "fail",
			"msg":    "User not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"user":   user,
	})
}
func GetProfileFromToken(c *gin.Context) {
	tokenString, err := c.Cookie("Authorization")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	//Decode/Validate it
	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok { //check the signing method
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//check exp
		if time.Now().Unix() > int64(claims["exp"].(float64)) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		//find the user with token sub
		var user usermodel.User
		initializers.DB.First(&user, claims["sub"])
		if user.ID == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  "fail",
				"message": " User Not found with this token",
			},
			)
		}
		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "User Found Successfully",
			"user":    user},
		)

	}
}
func UpdateProfileFromToken(c *gin.Context) {
	tokenString, err := c.Cookie("Authorization")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Decode/Validate the token
	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Check token expiration
		if time.Now().Unix() > int64(claims["exp"].(float64)) {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		type UpdatePayload struct {
			Student studentmodel.Student
			User    usermodel.User
		}

		// Find the user with token sub
		var user usermodel.User
		var student studentmodel.Student
		initializers.DB.First(&user, claims["sub"])
		initializers.DB.First(&student, "user_id = ?", user.ID)

		if user.ID == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status":  "fail",
				"message": "User not found with this token",
			})
			return
		}

		// Define a struct to hold update payload
		var updatePayload UpdatePayload
		if err := c.Bind(&updatePayload); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  "fail",
				"message": "Invalid request payload",
			})
			return
		}
		// Update user-specific fields
		if updatePayload.User.Name != "" {
			user.Name = updatePayload.User.Name
		}
		if updatePayload.User.Dob != "" {
			user.Dob = updatePayload.User.Dob
		}
		if updatePayload.User.Gender != "" {
			user.Gender = updatePayload.User.Gender
		}

		// Here, we update only student-specific fields
		if updatePayload.Student.ParentGuardianName != "" {
			student.ParentGuardianName = updatePayload.Student.ParentGuardianName
		}
		if updatePayload.Student.ParentGuardianEmail != "" {
			student.ParentGuardianEmail = updatePayload.Student.ParentGuardianEmail
		}
		if updatePayload.Student.ParentGuardianPhone != "" {
			student.ParentGuardianPhone = updatePayload.Student.ParentGuardianPhone
		}
		if updatePayload.Student.GradeLevel != "" {
			student.GradeLevel = updatePayload.Student.GradeLevel
		}
		log.Println(student.GradeLevel, user.Name, updatePayload.Student.GradeLevel)
		// Save the updated student information
		initializers.DB.Save(&user).Save(&student)

		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "Student profile updated successfully",
			"student": student,
			"user":    user,
		})
	}
}
func DeleteUser(c *gin.Context) {
	tokenStr, err := c.Cookie("Authorization")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": "fail",
			"message": "UnAuthorized Request,  Please Log in!",
		})
		return
	}
	// Decode/Validate the token
	token, _ := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Check token expiration
		if time.Now().Unix() > int64(claims["exp"].(float64)) {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		var user usermodel.User
		initializers.DB.First(&user, claims["sub"])
		initializers.DB.Delete(&user)

	}
	// After Performing Validations
	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Successfully deleted user",
	})
}
