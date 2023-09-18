package controllers

import (
	"Virtual-Horizon/src/utils"
	"github.com/gin-gonic/gin"
	"log"
)

func getRegisteredCourses(c *gin.Context) {

	user, err := utils.GetUserFromToken(c)
	if err != nil {
		log.Println(err)
	}

}
