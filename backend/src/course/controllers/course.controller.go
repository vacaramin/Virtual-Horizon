package controllers

import (
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/src/course/models"
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
