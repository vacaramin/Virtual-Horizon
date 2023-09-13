package routes

import (
	"Virtual-Horizon/src/tutor/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	tutorRoutes := r.Group("/tutor")
	tutorRoutes.POST("signup", controllers.TutorSignup)
}
