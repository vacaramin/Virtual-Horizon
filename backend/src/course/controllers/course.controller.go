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
	var courses models.Course
	initializers.DB.Preload("TutorCourseLink").Where("TutorCourseLink.TutorID = ?", user.ID).Find(&courses)
	c.JSON(http.StatusOK, gin.H{"courses": courses})
}
