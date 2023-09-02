package routes

import (
	controller "Virtual-Horizon/src/user/controllers"
	"github.com/gin-gonic/gin"
)

// SetupUserAuthRoutes This function sets all the authentication routes for the user
func SetupUserAuthRoutes(r *gin.Engine) {
	// Routes Related to Authentication of User
	r.POST("/login", controller.Login)
	r.POST("/logout", controller.Logout)

}
