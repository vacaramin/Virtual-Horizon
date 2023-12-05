package routes

import (
	enrollmentControllers "Virtual-Horizon/src/Enrollments/controllers"
	enrollmentRoutes "Virtual-Horizon/src/Enrollments/routes"

	courseControllers "Virtual-Horizon/src/course/controllers"
	courseRoutes "Virtual-Horizon/src/course/routes"
	"Virtual-Horizon/src/middleware"

	notificationControllers "Virtual-Horizon/src/notifications/controllers"
	notificationRoutes "Virtual-Horizon/src/notifications/routes"

	studentcontrollers "Virtual-Horizon/src/student/controllers"
	studentRoutes "Virtual-Horizon/src/student/routes"

	tutorControllers "Virtual-Horizon/src/tutor/controllers"
	tutorRoutes "Virtual-Horizon/src/tutor/routes"

	"Virtual-Horizon/src/user/routes"

	"github.com/gin-gonic/gin"
)

// SetupRoutes This function calls all the Routes of the underlying MVC's
func SetupRoutes(r *gin.Engine) {
	// Add CORS middleware
	r.Use(middleware.CorsMiddleware())

	// Setting up controllers for the routes
	courseController := &courseControllers.CourseController{}
	enrollmentController := &enrollmentControllers.EnrollmentController{}
	studentController := &studentcontrollers.StudentController{}
	tutorController := &tutorControllers.TutorController{}
	notificationController := &notificationControllers.NotificationController{}
	// user routes are being set in this route function
	courseRoutes.SetupRoutes(r, courseController)
	enrollmentRoutes.SetupRoutes(r, enrollmentController)
	studentRoutes.SetupStudentRoutes(r, studentController, enrollmentController)
	tutorRoutes.SetupRoutes(r, tutorController)
	notificationRoutes.SetupRoutes(r, notificationController)

	routes.SetupUserRoutes(r)
	routes.SetupUserAuthRoutes(r)

}
