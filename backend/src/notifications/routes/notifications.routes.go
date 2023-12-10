package routes

import (
	"Virtual-Horizon/src/notifications/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine, controller controllers.NotificationFunctions) {
	enrollmentRoutes := r.Group("notification")
	enrollmentRoutes.GET("getnotifications", controller.GetNotifications)
}
