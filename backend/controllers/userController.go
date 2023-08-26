package controllers

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/models"
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
		CurrentSchool       string
		Device              string
		InternetConnection  string
		SpecialNeeds        string
		Accomodations       string
		PresentAddress      string
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
	//Create a user
	user := models.User{
		Email:               body.Email,
		Password:            string(hash),
		Name:                body.Name,
		Dob:                 body.Dob,
		Gender:              body.Gender,
		ParentGuardianName:  body.ParentGuardianName,
		ParentGuardianEmail: body.ParentGuardianEmail,
		ParentGuardianPhone: body.ParentGuardianPhone,
		GradeLevel:          body.GradeLevel,
		CurrentSchool:       body.CurrentSchool,
		Device:              body.Device,
		InternetConnection:  body.InternetConnection,
		SpecialNeeds:        body.SpecialNeeds,
		Accomodations:       body.Accomodations,
		PresentAddress:      body.PresentAddress,
	}
	//Save the user
	result := initializers.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error while creating the user",
		})
		return
	}

	//return the response
	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
	})

}

func Login(c *gin.Context) {
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

	var user models.User
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

	c.SetCookie("Authorization", tokenString, 3600*24*7, "", "", false, true)
	c.SetCookie("User", user.Name, 3600*24*7, "", "", false, true)
	//uncomment if jwt is to be sent in response body
	c.JSON(http.StatusOK, gin.H{
		"status":   "success",
		"token":    tokenString,
		"username": user.Name,
		"user":     user,
	})

}

func Validate(c *gin.Context) {
	user, exist := c.Get("user")
	if !exist {
		c.JSON(http.StatusUnauthorized, gin.H{
			"status": "fail",
			"error":  "Invalid user",
		})
		return
	} else {

		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": user,
		})

	}
}
func GetProfileByID(c *gin.Context) {
	idStr, _ := c.Params.Get("ID")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Println("Invalid ID")
		c.JSON(http.StatusNotFound, gin.H{
			"msg": "ID is not valid",
		})
		return
	}

	var user models.User
	result := initializers.DB.First(&user, id)
	if result.Error != nil {
		log.Println("Error fetching user:", result.Error)
		c.JSON(http.StatusNotFound, gin.H{
			"msg": "User not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}
func GetIdfromToken(c *gin.Context) {
	tokenString, err := c.Cookie("Authorization")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	//Decode/Validate it
	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok { //check the signing method
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		//hmacSampl
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
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		c.JSON(http.StatusNotFound, gin.H{
			"user": user},
		)

	}
}
func Logout(c *gin.Context) {
	c.SetCookie("Authorization", "", -1, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "logout successful",
	})
}
