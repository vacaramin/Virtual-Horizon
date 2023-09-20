package routes

import (
	"Virtual-Horizon/src/Enrollments/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(engine *gin.Engine) {
	enrollmentRoutes := engine.Group("enrollments")
	enrollmentRoutes.POST("getEnrollments", controllers.GetEnrollments)
}
