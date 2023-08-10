package middleware

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/models"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func RequireAuth(c *gin.Context) {
	fmt.Println("in Middleware")
	//get the cookie off the request
	tokenString, err := c.Cookie("authorization")
	log.Println("1")
	if err != nil {
		log.Println("2")
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	log.Println("3")
	//Decode/Validate it
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok { //check the signing method

			log.Println("3.5")
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		//hmacSampl

		log.Println("3.53")
		return []byte(os.Getenv("SECRET")), nil
	})
	log.Println("4")

	log.Println("4")

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//check exp
		log.Println("5")
		if time.Now().Unix() > int64(claims["exp"].(float64)) {
			log.Println("6")

			c.AbortWithStatus(http.StatusUnauthorized)
		}
		log.Println("7")
		//find the user with token sub
		var user models.User
		initializers.DB.First(&user, claims["sub"])
		if user.ID == 0 {
			log.Println("8")

			c.AbortWithStatus(http.StatusUnauthorized)
		}

		//attach to req
		c.Set("user", user)
		fmt.Println("user is set in context")
		//continue

		log.Println("3")
		c.Next()
	} else {

		log.Println("4234")
		fmt.Println(err)
	}

}
