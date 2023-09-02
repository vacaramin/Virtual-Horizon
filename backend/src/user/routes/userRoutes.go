package routes

import (
	middleware "Virtual-Horizon/src/middleware"
	controller "Virtual-Horizon/src/user/controllers"
	"github.com/gin-gonic/gin"
)

// SetupUserRoutes this function sets All the User Routes with the baseUrl/user/`route`
func SetupUserRoutes(r *gin.Engine) {
	r.POST("/signup", controller.Signup)

	UserRoute := r.Group("/user") // Grouping under /api/user

	// Grouped routes for /user/
	UserRoute.GET("/GetProfileByID/:ID", middleware.ValidateToken(), controller.GetProfileByID)
	UserRoute.GET("/GetProfileFromToken", middleware.ValidateToken(), controller.GetProfileFromToken)
	UserRoute.PUT("/UpdateProfileFromToken", middleware.ValidateToken(), controller.UpdateProfileFromToken)
	UserRoute.DELETE("/DeleteUserFromToken", middleware.ValidateToken(), controller.DeleteUser)

}
