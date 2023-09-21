package controllers

import (
	"Virtual-Horizon/initializers"
	tutormodel "Virtual-Horizon/src/tutor/models"
	usermodel "Virtual-Horizon/src/user/models"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func TutorSignup(c *gin.Context) {
	fmt.Println("Signup")

	var body struct {
		usermodel.User
		Subject    string
		Experience string
		Rating     string
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
			"Status": "fail",
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
		Role:     usermodel.Role("Tutor"),
	}
	initializers.DB.Create(&user)
	//Create a user
	tutor := tutormodel.Tutor{
		ID:         user.ID,
		Subject:    body.Subject,
		Experience: body.Experience,
		Rating:     "5",
	}
	initializers.DB.Create(&tutor)

	initializers.DB.Save(&user).Save(&tutor)

	//return the response
	c.JSON(http.StatusOK, gin.H{
		"message": "Tutor created successfully",
	})

}

func GetTutorProfileByID(c *gin.Context) {
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

	var tutor tutormodel.Tutor
	result := initializers.DB.First(&tutor, "user_id = ?", id)
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
		"user":   tutor,
	})
}
func GetTutorProfileFromToken(c *gin.Context) {
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
func UpdateTutorProfileFromToken(c *gin.Context) {
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
			Tutor tutormodel.Tutor
			User  usermodel.User
		}

		// Find the user with token sub
		var user usermodel.User
		var tutor tutormodel.Tutor
		initializers.DB.First(&user, claims["sub"])
		initializers.DB.First(&tutor, "user_id = ?", user.ID)

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

		// Here, we update only tutor-specific fields
		if updatePayload.Tutor.Subject != "" {
			tutor.Subject = updatePayload.Tutor.Subject
		}
		if updatePayload.Tutor.Experience != "" {
			tutor.Experience = updatePayload.Tutor.Experience
		}
		if updatePayload.Tutor.Rating != "" {
			tutor.Rating = updatePayload.Tutor.Rating
		}

		// Save the updated tutor information
		initializers.DB.Save(&user).Save(&tutor)

		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": " profile updated successfully",
			"tutor":   tutor,
			"user":    user,
		})
	}
}
func DeleteTutor(c *gin.Context) {
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
