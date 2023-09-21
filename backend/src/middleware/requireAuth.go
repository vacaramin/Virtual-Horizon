package middleware

import (
	"Virtual-Horizon/initializers"
	studentmodel "Virtual-Horizon/src/student/models"
	"Virtual-Horizon/src/user/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"log"
	"net/http"
	"os"
	"time"
)

func ValidateToken() gin.HandlerFunc {
	log.Println("In the middle ware")
	return func(c *gin.Context) {
		tokenString, err := c.Cookie("Authorization")
		log.Println(tokenString, "token String")
		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// Decode/validate the token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(os.Getenv("SECRET")), nil
		})

		if err != nil || !token.Valid {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		userID := int(claims["sub"].(float64))
		// Fetch the user from the database using userID and attach it to the context
		var user models.User
		initializers.DB.First(&user, userID)
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		c.Set("user", user) // Attach the user to the context
		c.Next()
	}
}

func isStudent(c *gin.Context) {
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
		var user models.User
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
				c.Next()
			}

		} else {
			c.AbortWithStatus(http.StatusBadRequest)
		}
	}
}
