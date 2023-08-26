package main

import (
	"Virtual-Horizon/controllers"
	"Virtual-Horizon/initializers"
	"Virtual-Horizon/middleware"
	"fmt"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}
func main() {
	r := gin.Default()
	// Add CORS middleware
	r.Use(corsMiddleware())

	//setting routes here
	r.GET("/ping", pong)

	// listen and serve on

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	//r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.GET("/GetProfileByID/:ID", middleware.ValidateToken(), controllers.GetProfileByID)
	r.POST("/user/logout", controllers.Logout)
	r.Run()
	fmt.Println("Hello, world!")
}

func pong(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		// Handle OPTIONS request
		if c.Request.Method == "OPTIONS" {
			c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
			c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			c.Header("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type")
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
