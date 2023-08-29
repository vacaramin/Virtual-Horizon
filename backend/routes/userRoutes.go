package routes

import (
	"Virtual-Horizon/controllers"
	"Virtual-Horizon/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Add CORS middleware
	r.Use(middleware.CorsMiddleware())

	apiUserGroup := r.Group("/user") // Grouping under /api/user

	// Public routes
	r.GET("/ping", pong)
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)

	// Grouped routes under /user
	apiUserGroup.GET("/GetProfileByID/:ID", middleware.ValidateToken(), controllers.GetProfileByID)
	apiUserGroup.GET("/GetProfileFromToken", middleware.ValidateToken(), controllers.GetProfileFromToken)
	apiUserGroup.POST("/logout", controllers.Logout)
	apiUserGroup.PUT("/UpdateProfileFromToken", middleware.ValidateToken(), controllers.UpdateProfileFromToken)
	apiUserGroup.DELETE("/DeleteUserFromToken", middleware.ValidateToken(), controllers.DeleteUser)

}
func pong(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
