package controllers

import (
	"Virtual-Horizon/initializers"
	enrollmentModel "Virtual-Horizon/src/Enrollments/models"
	userModel "Virtual-Horizon/src/user/models"
	"Virtual-Horizon/src/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetEnrollments(ctx *gin.Context) {

	user, err := utils.GetUserFromToken(ctx)
	if err != nil {
		log.Println(err)
	}
	if user.Role != userModel.Student {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"status":  "fail",
			"message": "This api request is only available for student role",
		})
	}
	// things you need
	// the user
	// the list of courses
	// Get all the enrollments based on students. and extract all enrollment details
	// which is placed within the enrollment table
	var enrollments *enrollmentModel.Enrollment

	log.Println("Reached up til here")
	initializers.DB.Find(&enrollments).Where("student_id = ?", user.ID)
	ctx.JSON(http.StatusOK, gin.H{
		"status":     "Success",
		"Enrollment": enrollments,
	})
}
