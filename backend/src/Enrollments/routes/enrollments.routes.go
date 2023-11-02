package routes

import (
	"Virtual-Horizon/src/Enrollments/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(engine *gin.Engine, controller controllers.EnrollmentFunctions) {
	enrollmentRoutes := engine.Group("enrollments")
	enrollmentRoutes.POST("getEnrollments", controller.GetEnrollments)
}
