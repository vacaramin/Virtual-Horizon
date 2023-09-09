package userControllers

import (
	"Virtual-Horizon/initializers"
	model "Virtual-Horizon/src/user/models"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/golang-jwt/jwt"
)

// Login This controller function for user takes in 2 parameters email and password and authenticates the user
func Login(c *gin.Context) {
	// Clearing Previously Logged-in User, If any.
	c.SetCookie("Authorization", "", -1, "/", "localhost", false, true)

	//get the email and pass of request body
	var body struct {
		Email    string
		Password string
	}
	c.Header("Access-Control-Allow-Methods", "POST") // Add other allowed methods if needed
	c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
	c.Header("Access-Control-Allow-Origin", "*")
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "failed",
			"error":  "Invalid request body",
		})
		return
	}
	//look up requested user

	var user model.User
	initializers.DB.First(&user, "email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "failed",
			"error":  "Invalid Email or Password",
		})
		return
	}

	//compare sent in pass with user pass hash

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "failed",
			"error":  "Invalid Email or Password",
		})
		return
	}

	//generate jwt

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(),
	})
	//sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": "failed",
			"error":  "Error while generating token",
		})
		return
	}
	//send it back

	c.SetCookie("Authorization", tokenString, 3600*24*7, "/", "localhost", false, true)
	//uncomment if jwt is to be sent in response body
	c.JSON(http.StatusOK, gin.H{
		"status":        "success",
		"Authorization": tokenString,
	})

}

// Logout this Function Logs out the User based on the cookie
func Logout(c *gin.Context) {

	if _, err := c.Cookie("Authorization"); err != nil {

		log.Println("err = ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "fail",
			"message": "you are already Logged out",
		})
	} else {
		c.SetCookie("Authorization", "", -1, "/", "localhost", false, true)

		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "logout successful",
		})
	}
}
