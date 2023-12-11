package routes

import (
	"Virtual-Horizon/src/tutor/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, controller controllers.TutorFunctions) {

	tutorRoutes := r.Group("/tutor")
	tutorRoutes.POST("signup", controller.TutorSignup)
}
