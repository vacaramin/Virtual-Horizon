package routes

import (
	"Virtual-Horizon/src/middleware"
	studentRoutes "Virtual-Horizon/src/student/routes"
	"Virtual-Horizon/src/user/routes"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Add CORS middleware
	r.Use(middleware.CorsMiddleware())
	// /user routes are being set in this route function
	routes.SetupUserRoutes(r)
	routes.SetupUserAuthRoutes(r)
	studentRoutes.SetupStudentRoutes(r)
}
