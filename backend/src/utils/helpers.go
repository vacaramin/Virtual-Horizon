package utils

import (
	"Virtual-Horizon/initializers"
	usermodel "Virtual-Horizon/src/user/models"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"os"
	"time"
)

// GetUserFromToken This function uses the gin context and based on the cookie authentication key, it returns the user and an error.
func GetUserFromToken(c *gin.Context) (*usermodel.User, error) {
	var user usermodel.User
	tokenString, err := c.Cookie("Authorization")

	if err != nil {
		return nil, errors.New("couldn't find token of authorization in cookie")
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
			return nil, errors.New("token not authorized")
		}

		//find the user with token sub
		initializers.DB.First(&user, claims["sub"])
		if user.ID == 0 {
			return nil, errors.New("didn't find a user with this token")
		}

	}
	return &user, nil

}

// GetUserRoleFromToken Helper Function to Get the role of user based on token, function made with intention to use it in the middleware
func GetUserRoleFromToken(c *gin.Context) (usermodel.Role, error) {
	user, err := GetUserFromToken(c)
	if err != nil {
		return "", err
	}
	return user.Role, nil
}
