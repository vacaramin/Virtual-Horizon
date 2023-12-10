package userControllers

import (
	"Virtual-Horizon/initializers"
	studentmodel "Virtual-Horizon/src/student/models"
	tutormodel "Virtual-Horizon/src/tutor/models"
	usermodel "Virtual-Horizon/src/user/models"
	"Virtual-Horizon/src/utils"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

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
		if user.Role == "student" {
			var student studentmodel.Student
			if err := initializers.DB.First(&student, user.ID).Error; err != nil {
				// Handle the error
				log.Println("Error:", err)
				c.JSON(http.StatusInternalServerError, gin.H{
					"status":  "error",
					"message": "Internal Server Error",
				})
			}

			log.Println("student id =", student.ID)

			if student.ID == 0 {
				c.JSON(http.StatusUnauthorized, gin.H{
					"status":  "fail",
					"message": "Student Not found with this token",
				})
				return
			} else {
				c.JSON(http.StatusOK, gin.H{
					"status":  "success",
					"message": "User Found Successfully",
					"user":    user,
					"student": student,
				})
			}

		} else if user.Role == "tutor" {
			var tutor tutormodel.Tutor
			if err := initializers.DB.First(&tutor, user.ID).Error; err != nil {
				// Handle the error
				log.Println("Error:", err)
				c.JSON(http.StatusInternalServerError, gin.H{
					"status":  "error",
					"message": "Internal Server Error",
				})
			}

			log.Println("student id =", tutor.ID)

			if tutor.ID == 0 {
				c.JSON(http.StatusUnauthorized, gin.H{
					"status":  "fail",
					"message": "Student Not found with this token",
				})
				return
			} else {
				c.JSON(http.StatusOK, gin.H{
					"status":  "success",
					"message": "User Found Successfully",
					"user":    user,
					"tutor":   tutor,
				})
			}
		} else if user.Role == "admin" {
			c.JSON(http.StatusOK, gin.H{
				"status":  "success",
				"message": "User Found Successfully",
				"user":    user},
			)
		} else {
			c.AbortWithStatus(http.StatusBadRequest)
		}

	}
}
func UpdateProfileFromToken(c *gin.Context) {
	user, err := utils.GetUserFromToken(c)
	if err != nil {
		log.Println("ERROR FINDING USER WITH THE TOKEN")
		c.JSON(http.StatusUnauthorized, gin.H{
			"Status": "Fail",
			"Error":  "ERROR FINDING USER WITH THis token",
		})
	}
	type UpdatePayload struct {
		User usermodel.User
	}

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
	var zeroTime time.Time
	if updatePayload.User.Dob != zeroTime {
		user.Dob = updatePayload.User.Dob
	}
	if updatePayload.User.Gender != "" {
		user.Gender = updatePayload.User.Gender
	}
	if updatePayload.User.About != "" {
		user.About = updatePayload.User.About
	}

	// Save the updated student information
	initializers.DB.Save(&user)

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Student profile updated successfully",
		"user":    user,
	})
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
