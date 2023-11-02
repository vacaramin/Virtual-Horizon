package routes

import (
	enrollmentRoutes "Virtual-Horizon/src/Enrollments/routes"
	"Virtual-Horizon/src/course/controllers"
	courseRoutes "Virtual-Horizon/src/course/routes"
	"Virtual-Horizon/src/middleware"
	studentRoutes "Virtual-Horizon/src/student/routes"
	tutorRoutes "Virtual-Horizon/src/tutor/routes"
	"Virtual-Horizon/src/user/routes"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Add CORS middleware
	r.Use(middleware.CorsMiddleware())
	// Setting up controller structs for
	courseController := &controllers.CourseController{}
	// /user routes are being set in this route function
	routes.SetupUserRoutes(r)
	routes.SetupUserAuthRoutes(r)
	studentRoutes.SetupStudentRoutes(r)
	tutorRoutes.SetupRoutes(r)

	courseRoutes.SetupRoutes(r, courseController)
	enrollmentRoutes.SetupRoutes(r)
}
