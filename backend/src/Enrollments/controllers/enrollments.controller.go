package controllers

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/src/Enrollments/models"
	userModel "Virtual-Horizon/src/user/models"
	"Virtual-Horizon/src/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type EnrollmentFunctions interface {
	GetEnrollments(*gin.Context)
}
type EnrollmentController struct{}

func (_ *EnrollmentController) GetEnrollments(ctx *gin.Context) {

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

	var enrollments models.Enrollments

	log.Println("Reached up til here")
	initializers.DB.
		Preload("Link.Tutor.User").
		Preload("Link.Course").
		Preload("Student.User").
		Where("student_id = ?", user.ID).
		Find(&enrollments)

	ctx.JSON(http.StatusOK, gin.H{
		"status":               "Success",
		"EnrollmentController": enrollments,
	})
}
