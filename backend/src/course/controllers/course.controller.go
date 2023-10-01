package controllers

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/src/course/models"
	userModel "Virtual-Horizon/src/user/models"
	"Virtual-Horizon/src/utils"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func GetTutorRegisteredCourses(c *gin.Context) {

	user, err := utils.GetUserFromToken(c)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"status":  "Failed",
			"message": err,
		})
	}
	var courses models.Courses
	initializers.DB.
		Joins("JOIN tutor_course_links ON courses.id = tutor_course_links.course_id").
		Where("tutor_course_links.tutor_id = ?", user.ID).
		Find(&courses)

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"links":  courses,
	})
}

func GetStudentCourses(ctx *gin.Context) {

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
	var Courses models.Courses

	log.Println("Reached up til here")

	initializers.DB.Debug().
		Joins("JOIN tutor_course_links ON courses.id = tutor_course_links.course_id").
		Joins("JOIN enrollments ON enrollments.link_id = tutor_course_links.id").
		Where("enrollments.student_id = ?", user.ID).
		Find(&Courses)

	ctx.JSON(http.StatusOK, gin.H{
		"status":     "Success",
		"Enrollment": Courses,
	})
}
