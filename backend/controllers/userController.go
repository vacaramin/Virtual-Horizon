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
	// Create User Model
	user := models.User{
		Email:    body.Email,
		Password: string(hash),
		Name:     body.Name,
		Dob:      body.Dob,
		Gender:   body.Gender,
	}
	initializers.DB.Create(&user)
	//Create a user
	student := models.Student{
		UserID:              user.ID,
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
	initializers.DB.Create(&student)

	initializers.DB.Save(&user).Save(&student)

	//return the response
	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
	})

}

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

	c.SetCookie("Authorization", tokenString, 3600*24*7, "/", "localhost", false, true)
	//uncomment if jwt is to be sent in response body
	c.JSON(http.StatusOK, gin.H{
		"status":        "success",
		"Authorization": tokenString,
	})

}

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

	var user models.User
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
		var user models.User
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
			Student models.Student
			User    models.User
		}

		// Find the user with token sub
		var user models.User
		var student models.Student
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
		if updatePayload.Student.CurrentSchool != "" {
			student.CurrentSchool = updatePayload.Student.CurrentSchool
		}
		if updatePayload.Student.Device != "" {
			student.Device = updatePayload.Student.Device
		}
		if updatePayload.Student.InternetConnection != "" {
			student.InternetConnection = updatePayload.Student.InternetConnection
		}
		if updatePayload.Student.SpecialNeeds != "" {
			student.SpecialNeeds = updatePayload.Student.SpecialNeeds
		}
		if updatePayload.Student.Accomodations != "" {
			student.Accomodations = updatePayload.Student.Accomodations
		}
		if updatePayload.Student.PresentAddress != "" {
			student.PresentAddress = updatePayload.Student.PresentAddress
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
		var user models.User
		initializers.DB.First(&user, claims["sub"])
		initializers.DB.Delete(&user)

	}
	// After Performing Validations
	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Successfully deleted user",
	})
}
