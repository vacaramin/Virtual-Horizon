package middleware

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"log"
	"net/http"
	"os"
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
