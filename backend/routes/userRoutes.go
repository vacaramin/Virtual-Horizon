package routes

import (
	"Virtual-Horizon/controllers"
	"Virtual-Horizon/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Add CORS middleware
	r.Use(middleware.CorsMiddleware())

	apiUserGroup := r.Group("/api/user") // Grouping under /api/user

	// Public routes
	r.GET("/ping", pong)
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)

	// Grouped routes under /api/user
	apiUserGroup.GET("/GetProfileByID/:ID", middleware.ValidateToken(), controllers.GetProfileByID)
	apiUserGroup.GET("/GetProfileByToken", middleware.ValidateToken(), controllers.GetProfilefromToken)
	apiUserGroup.POST("/logout", controllers.Logout)
}
func pong(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
