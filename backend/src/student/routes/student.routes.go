package routes

import (
	EnrollmentController "Virtual-Horizon/src/Enrollments/controllers"
	Studentcontroller "Virtual-Horizon/src/student/controllers"
	"github.com/gin-gonic/gin"
)

// SetupStudentRoutes this function sets All the User Routes with the baseUrl/user/`route`
func SetupStudentRoutes(r *gin.Engine, studentController Studentcontroller.StudentFunctions, enrollmentController EnrollmentController.EnrollmentFunctions) {
	StudentRoute := r.Group("/student")
	StudentRoute.POST("/signup", studentController.SignupStudent)
	StudentRoute.POST("/vh-assistant", studentController.GetVirtualAssistantResponse)
	StudentRoute.POST("/getenrollments", func(c *gin.Context) {
		studentController.GetEnrollments(c, enrollmentController)
	})

}
