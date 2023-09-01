package routes

import (
	middleware2 "Virtual-Horizon/src/middleware"
	"Virtual-Horizon/src/user/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Add CORS middleware
	r.Use(middleware2.CorsMiddleware())

	apiUserGroup := r.Group("/user") // Grouping under /api/user

	// Public routes
	r.GET("/ping", pong)
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)

	// Grouped routes under /user
	apiUserGroup.GET("/GetProfileByID/:ID", middleware2.ValidateToken(), controllers.GetProfileByID)
	apiUserGroup.GET("/GetProfileFromToken", middleware2.ValidateToken(), controllers.GetProfileFromToken)
	apiUserGroup.POST("/logout", controllers.Logout)
	apiUserGroup.PUT("/UpdateProfileFromToken", middleware2.ValidateToken(), controllers.UpdateProfileFromToken)
	apiUserGroup.DELETE("/DeleteUserFromToken", middleware2.ValidateToken(), controllers.DeleteUser)

}
func pong(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
