package routes

import (
	controller "Virtual-Horizon/src/student/controllers"
	"github.com/gin-gonic/gin"
)

// SetupStudentRoutes this function sets All the User Routes with the baseUrl/user/`route`
func SetupStudentRoutes(r *gin.Engine) {
	StudentRoute := r.Group("/student")
	StudentRoute.POST("/signup", controller.SignupStudent)
	StudentRoute.POST("vh-assistant", controller.GetVirtualAssistantResponse)
}
